import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {navigationList} from "../../constants/NavigationList";
import history from "../../history";
import {useLocalRoute} from "../../hooks/useLocalAuthentication";
import Routes from "../../constants/Routes";
import Challenge30DayPage from "../challenges/Challenge30DayPage";
import ChallengePage from "../challenges/ChallengePage";

export const HomeSwitch = () => {
    const [, setRoute] = useLocalRoute();
    setRoute(history.location.pathname)

    return (
        <Switch>
            <Route path={Routes.challenge} component={ChallengePage}/>
            <Route path={Routes.challenges30Day} component={Challenge30DayPage}/>

            {navigationList.map(e => {
                return (
                    <Route key={e.path} path={e.path}>
                        <e.component/>
                    </Route>
                )
            })}


            <Route path={Routes.home}>
                <Redirect to={Routes.homeLanding}/>
            </Route>
        </Switch>
    )
}

export default HomeSwitch;
