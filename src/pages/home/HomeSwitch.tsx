import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {navigationList} from "../../constants/NavigationList";
import history from "../../history";
import {useLocalRoute} from "../../hooks/useLocalAuthentication";
import Routes from "../../constants/Routes";

export const HomeSwitch = () => {
    const [, setRoute] = useLocalRoute();
    setRoute(history.location.pathname)

    return (
        <Switch>
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
