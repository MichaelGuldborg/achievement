import React from "react";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Routes from "../../constants/Routes";
import history from "../../history";
import {useAllActivities} from "../../hooks/useActivity";
import Activity from "../../models/Activity";
import LifeMap from "../lifemap/LifeMapGrid";
import lifeMaps from "../../data/lifeMaps";
import ExternalLinkLineIcon from "remixicon-react/ExternalLinkLineIcon";
import IconButton from "@material-ui/core/IconButton";
import ActivityCard from "./ActivityCard";
import LifeBalanceGrid from "../LifeBalanceGrid";
import Colors from "../../constants/Colors";
import bg from "../community/pexels-julia-volk-6062504.jpg";


// TODO
// Add life balances


// TODO
// Story line
// [x] Show main story line in a 90 year week view
// [x] Crud form to make custom lifemap
// [x] Select weeks instead of input number
// [x] Fix edit function using randomId()
// [ ] Sort entries by start time in list


// TODO
// Add pagination
// Add category filter
// Add search functionality
// Add create/edit form


export const HomeLandingPage = () => {


    return (
        <div style={{
            width: '100vw',
            backgroundColor: 'white',
        }}>
            <div style={{
                height: 240,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                position: 'relative',
            }}>
                <div style={{
                    // color: 'white',
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    // padding: 16,
                    position: 'absolute',
                    bottom: 48,
                    left: 16
                }}>
                    Start building your life
                </div>

            </div>

        </div>
    )


    return (
        <Container style={{marginTop: 32}}>
            {/*<div*/}
            {/*    style={{*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <h1>Life balance</h1>*/}
            {/*    <IconButton onClick={() => history.push(Routes.habits)}>*/}
            {/*        <ExternalLinkLineIcon/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
            {/*<LifeBalanceGrid/>*/}

            {/*<div*/}
            {/*    style={{*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <h1>Life map</h1>*/}
            {/*    <IconButton onClick={() => history.push(Routes.lifeMap)}>*/}
            {/*        <ExternalLinkLineIcon/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <div style={{marginLeft: -32, marginRight: -32, paddingTop: 8, paddingBottom: 16}}>*/}
            {/*        <LifeMap*/}
            {/*            birthDate={new Date(1996, 3, 7)}*/}
            {/*            skip={25}*/}
            {/*            take={5}*/}
            {/*            entries={lifeMaps[0].entries}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div*/}
            {/*    style={{*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center',*/}
            {/*        justifyContent: 'space-between'*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <h1>Activities</h1>*/}
            {/*</div>*/}
            {/*<Grid container spacing={3}>*/}
            {/*    {elements.slice(0, 8).map((element, index) => (*/}
            {/*        <Grid key={element.id} item md={3}>*/}
            {/*            <ActivityCard*/}
            {/*                onClick={handleEditClick(element)}*/}
            {/*                element={element}*/}
            {/*            />*/}
            {/*        </Grid>*/}
            {/*    ))}*/}
            {/*</Grid>*/}
        </Container>
    )
}


export default HomeLandingPage;
