import React from 'react';
import {Route, Switch} from "react-router-dom";
import {navigationList} from "../../constants/NavigationList";

export const HomeSwitch = () => {
    return (
        <Switch>

            {navigationList.map(e => {
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
