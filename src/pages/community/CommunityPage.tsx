import React from 'react'
import HeaderNav from "./HeaderNav";
import {Route, Switch} from "react-router-dom";
import MePage from "./MePage";
import ExplorePage from "./ExplorePage";
import {Container} from "@material-ui/core";

const CommunityPage = () => {

    return (
        <div>
            <HeaderNav/>
            <Switch>
                <Route path='/nicolai/me' component={MePage}/>
                <Route exact path='/nicolai' component={ExplorePage}/>
            </Switch>

            <div style={{
                background: '#F7F7F7',
                paddingTop: 32,
                paddingBottom: 32,
            }}>
                <Container>
                </Container>
            </div>
        </div>
    )
}

export default CommunityPage;

