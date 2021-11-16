import {activityLevelMap, activityTypesMap} from "../../data/activities";
import Banner from "./Banner";
import PencilLineIcon from "remixicon-react/PencilLineIcon";
import history from "../../history";
import Routes from "../../constants/Routes";
import QuestionMarkIcon from "remixicon-react/QuestionMarkIcon";
import React, {MouseEventHandler} from "react";
import {subtitleFromChallenge} from "./ChallengeListPage";
import {Challenge} from "../../models/Activity";
import CheckIcon from "./CheckIcon";
import theme from "../../constants/theme";

export const ChallengeListItem: React.FC<{
    challenge: Challenge;
    index: number;
    onClick?: MouseEventHandler;
    onCheckClick?: MouseEventHandler;
}> = (
    {
        challenge,
        index,
        onClick,
        onCheckClick,
    }
) => {
    return (
        <div
            key={`challenge-${index}`}
            style={{
                marginBottom: 16,
                position: 'relative',
                transition: 'all 150ms cubic-bezier(0.694, 0.0482, 0.335, 1)',
                boxShadow: '4px 4px 8px 3px rgb(152 162 179 / 15%), 0 2px 2px -1px rgb(152 162 179 / 30%)',
                //     ? '2px 2px 4px -1px rgb(152 162 179 / 15%), 0 2px 2px -1px rgb(152 162 179 / 30%)'
                overflow: 'hidden',
                borderRadius: 4,
            }}>
            {challenge.level && activityLevelMap[challenge.level] &&
            <Banner
                position={'top-left'}
                color={activityLevelMap[challenge.level].color}
            />}
            <Banner
                position={'bottom-right'}
                style={{border: '1px #888 solid'}}
            />
            <div
                onClick={onClick}
                style={{position: 'absolute', bottom: 0, right: 0}}
            >
                <PencilLineIcon size={20} color={theme.colors.textGrey}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>

                <div
                    onClick={(e) => {
                        history.push(Routes.challenge.replace(':challengeId', challenge.id));
                    }}
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: 16,
                    }}
                >
                    {challenge.activity && activityTypesMap[challenge.activity] ?
                        <div style={{marginRight: 12}}>
                            <img
                                src={activityTypesMap[challenge.activity].icon}
                                alt={challenge.activity}
                                style={{width: 24, height: 24}}
                            />
                        </div> : <div style={{marginRight: 12}}>
                            <QuestionMarkIcon size={24}/>
                        </div>}
                    <div>
                        <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>
                            {challenge.name}
                        </h3>
                        <div style={{fontSize: 14, color: theme.colors.textGrey}}>
                            {subtitleFromChallenge(challenge)}
                        </div>
                    </div>
                </div>
                <div style={{paddingRight: 16}} onClick={onCheckClick}>
                    <CheckIcon checked={challenge.checked}/>
                </div>
            </div>
        </div>
    )
}