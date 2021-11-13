import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import useActivity from "../../hooks/useActivity";
import {useParams} from "react-router-dom";
import {Grid} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import CheckboxBlankCircleLineIcon from "remixicon-react/CheckboxBlankCircleLineIcon";
import CheckboxCircleFillIcon from "remixicon-react/CheckboxCircleFillIcon";
import theme from "../../constants/theme";
import ExternalLinkLineIcon from "remixicon-react/ExternalLinkLineIcon";
import IconButton from "@material-ui/core/IconButton";
import history from "../../history";
import Routes from "../../constants/Routes";


export const ActivityPage = () => {

    const {activityId} = useParams<{ activityId: string }>();
    const [activity, setActivity] = useActivity(activityId);
    const [levelIndex, setLevelIndex] = useState<number>(0)

    const updateChallengeComplete = (levelIndex: number, challengeIndex: number, checked: boolean) => {
        const updatedActivity = {...activity};
        updatedActivity.levels[levelIndex].challenges[challengeIndex].checked = checked;
        setActivity(updatedActivity)
    }



    if (!activity) return <div/>


    return (
        <div style={{
            position: 'relative',
            width: '100%',
            // background: 'white',
            // overflow: 'hidden',
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover',
            // backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)), url('${activity.backgroundUrl}')`,
        }}>

            <Container style={{marginTop: 32}}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h1>{activity.name}</h1>
                </div>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper style={{display: 'flex', flexDirection: 'column'}}>
                            {activity.levels.map((e, index) => {
                                return <ListItem
                                    button
                                    onClick={() => setLevelIndex(index)}
                                    selected={index === levelIndex}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                        fontSize: 16,
                                    }}>
                                        {e.challenges.find(c => !c.checked) ?
                                            <CheckboxBlankCircleLineIcon size={26} color={theme.palette.primary.main}/>
                                            : <CheckboxCircleFillIcon size={26} color={theme.palette.primary.main}/>}
                                        <span style={{marginLeft: 8}}>
                                        {e.name}
                                    </span>
                                    </div>
                                </ListItem>;
                            })}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {activity.levels[levelIndex]?.challenges.map((e, challengeIndex) => {
                                return <Paper style={{
                                    marginBottom: 16,
                                    padding: 16,
                                }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: 16,
                                        }}
                                    >
                                        <h3 style={{margin: 0}}>{e.name}</h3>
                                        <div>
                                            {e.type && <IconButton onClick={() => history.push(Routes.challenges30Day)}>
                                                <ExternalLinkLineIcon/>
                                            </IconButton>
                                            }
                                            <Checkbox
                                                checked={e.checked}
                                                onChange={(e, c) => updateChallengeComplete(levelIndex, challengeIndex, c)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {e.description}
                                    </div>
                                </Paper>
                            })}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h3 style={{marginTop: 0}}>Material</h3>
                            {activity.material?.map((e, index) => {
                                return <ListItem
                                    button
                                    onClick={() => window.open(e.url, "_blank")}
                                    style={{marginBottom: 8, backgroundColor: 'white'}}
                                >
                                    {e.name}
                                </ListItem>;
                            })}
                        </div>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default ActivityPage;
