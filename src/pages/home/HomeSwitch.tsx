import React from 'react';
import {Route, Switch} from "react-router-dom";
import {navigationList} from "../../constants/NavigationList";
import history from "../../history";
import {useLocalRoute} from "../../hooks/useLocalAuthentication";

export const HomeSwitch = () => {
    const [, setRoute] = useLocalRoute();
    setRoute(history.location.pathname)

    return (
        <Switch>
            {[...navigationList].reverse().map(e => {
                return (
                    <Route key={e.path} path={e.path}>
                        <e.component/>
                    </Route>
                )
            })}
        </Switch>
    )
}

export default HomeSwitch;
