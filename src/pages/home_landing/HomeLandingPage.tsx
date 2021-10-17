import React from "react";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Routes from "../../constants/Routes";
import history from "../../history";
import {useAllActivities} from "../../hooks/useActivity";
import Activity, {getMaxCompletedLevel} from "../../models/Activity";
import StoryLineGrid from "../storyline/StoryLineGrid";
import storyLines from "../../data/storyLines";
import ExternalLinkLineIcon from "remixicon-react/ExternalLinkLineIcon";
import IconButton from "@material-ui/core/IconButton";


// TODO
// Add life balances


// main story line
const t = [
    'Get an education',
    'Start a carrier',
    'Find a significant other',
    'Have kids',
    'Buy a house',
]

// TODO
// Story line
// Show main story line in a 90 year week view


// TODO
// Add pagination
// Add category filter
// Add search functionality
// Add create/edit form

export const HomeLandingPage = () => {

    const elements = useAllActivities();

    const handleEditClick = (activity: Activity) => () => onEditClick(activity)
    const onEditClick = (activity: Activity) => {
        const path = Routes.activity.replace(':activityId', activity.id)
        history.push({pathname: path});
    }


    return (
        <Container style={{marginTop: 32}}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <h1>Life balance</h1>
            </div>
            <div>
                TODO
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <h1>Story Line</h1>
                <IconButton onClick={() => history.push(Routes.storyline)}>
                    <ExternalLinkLineIcon/>
                </IconButton>
            </div>
            <div>
                <div style={{marginLeft: -32, marginRight: -32, paddingTop: 8, paddingBottom: 16}}>
                    <StoryLineGrid
                        birthDate={new Date(1996, 3, 7)}
                        skip={25}
                        take={5}
                        entries={storyLines[0].entries}
                    />
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <h1>Activities</h1>
            </div>
            <Grid container spacing={3}>

                {elements.slice(0, 8).map((element, index) => (
                    <Grid key={element.id} item md={3}>
                        <ActivityCard
                            onClick={handleEditClick(element)}
                            element={element}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export const ActivityCard: React.FC<{
    onClick: VoidFunction,
    element: Activity
}> = (
    {
        onClick,
        element,
    }
) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: 'relative',
                padding: 8,
                background: 'white',
                borderRadius: 8,
                boxShadow: '0 5px 25px rgba(0,0,0,.04)',
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: 160,
                    background: 'rgba(0,0,0,.05)',
                    borderRadius: 8,
                    // background: 'white',
                    overflow: 'hidden',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url('${element.imageUrl}')`,
                }}
            >
            </div>

            <div style={{
                paddingTop: 8,
                paddingBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span style={{
                    fontSize: 20,
                    fontWeight: 600,
                }}>
                    {element.name}
                </span>
                <span style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#777',
                    marginRight: 8
                }}>
                                    {getMaxCompletedLevel(element)} / {element.levels.length}
                                </span>
            </div>
        </div>
    );
}

export default HomeLandingPage;
