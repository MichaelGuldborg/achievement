import React from "react";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Routes from "../../constants/Routes";
import history from "../../history";
import {useAllActivities} from "../../hooks/useActivity";
import Activity, {getMaxCompletedLevel} from "../../models/Activity";


export const HomeLandingPage = () => {

    const elements = useAllActivities();


    // menu state
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
                <h1>Activities</h1>
            </div>
            <Grid container spacing={3}>

                {elements.map((element, index) => (
                    <Grid key={element.id} item md={4}>
                        <div
                            onClick={handleEditClick(element)}
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
                    </Grid>
                ))}
            </Grid> </Container>)
}

export default HomeLandingPage;
