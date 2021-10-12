import React from 'react';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import Routes from "./constants/Routes";
import ErrorPage from "./pages/error/ErrorPage";
import {TestPage} from "./pages/error/TestPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import HomePage from "./pages/home/HomePage";
import {ThemeProvider} from '@material-ui/core';
import theme, {CustomTheme} from "./constants/theme";
import history from "./history";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const queryClient = new QueryClient();

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ThemeProvider<CustomTheme> theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Router history={history}>
                            <Switch>
                                {/*AUTH*/}
                                {/*<Route exact path={Routes.landing} component={HomePage}/>*/}
                                {/*<Route path={Routes.resetPassword} component={ResetPasswordPage}/>*/}
                                {/*<Route path={Routes.register} component={RegisterUserPage}/>*/}

                                {/*HOME*/}
                                <Route path={Routes.home} component={HomePage}/>


                                {/*ERROR*/}
                                <Route path={Routes.error} component={ErrorPage}/>
                                <Route path={Routes.test} component={TestPage}/>


                                <Route path={Routes.landing}>
                                    <Redirect to={Routes.home}/>
                                </Route>
                                <Route path="*" component={NotFoundPage}/>
                            </Switch>
                        </Router>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
