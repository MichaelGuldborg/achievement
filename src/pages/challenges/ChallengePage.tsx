import React from "react";
import {useParams} from "react-router-dom";
import {activityLevelMap} from "../../data/activities";
import {Button} from "@material-ui/core";
import history from "../../history";
import Routes from "../../constants/Routes";
import Banner from "./Banner";
import {subtitleFromChallenge} from "./ChallengeListPage";
import CheckIcon from "./CheckIcon";
import theme from "../../constants/theme";
import firestoreHooks from "../../hooks/firestoreHooks";


export const ChallengePage = () => {

    const {challengeId} = useParams<{ challengeId: string }>();
    const {value} = firestoreHooks.useUserChallenge(challengeId);

    if (!value) {
        return (
            <div style={{width: '100vw', backgroundColor: 'white'}}>
                <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                    Challenge could not be found
                </div>
            </div>
        )
    }

    return (
        <div style={{width: '100vw', backgroundColor: 'white'}}>
            <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>

            <div style={{position: 'relative', overflow: 'hidden'}}>
                <Banner
                    position={'top-left'}
                    size={24}
                    color={activityLevelMap[value.level ?? '']?.color}
                />


                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 24px'
                }}>
                    <div style={{flex: 1}}>
                        <div style={{
                            fontSize: 24,
                            fontWeight: 600
                        }}>
                            {value.name}
                        </div>
                        <div style={{fontSize: 16, color: theme.colors.textGrey}}>
                            {subtitleFromChallenge(value)}
                        </div>
                    </div>
                    <CheckIcon checked={value.checked}/>
                </div>
                <div style={{padding: '0px 16px', marginBottom: 16}}>
                    {value.description}
                </div>
                <div style={{padding: '0px 16px', marginBottom: 16, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        onClick={() => history.push(Routes.challenges30Day.replace(':challengeId', value.id))}
                        color='secondary'
                        variant='outlined'
                        style={{
                            paddingBottom: 10,
                            paddingTop: 10,
                            textTransform: "none",
                            borderRadius: 8
                        }}
                    >
                        30 day challenge
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChallengePage;
