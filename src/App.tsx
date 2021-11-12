import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
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
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import CommunityPage from "./pages/community/CommunityPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import RegisterUserPage from "./pages/auth/RegisterUserPage";
import LoginPage from "./pages/auth/LoginPage";

const queryClient = new QueryClient();

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ThemeProvider<CustomTheme> theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DndProvider backend={HTML5Backend}>

                            <Router history={history}>
                                <Switch>
                                    {/*AUTH*/}
                                    <Route exact path={Routes.landing} component={LoginPage}/>
                                    <Route path={Routes.resetPassword} component={ResetPasswordPage}/>
                                    <Route path={Routes.register} component={RegisterUserPage}/>

                                    <Route path="/nicolai" component={CommunityPage}/>

                                    {/*HOME*/}
                                    <Route path={Routes.home} component={HomePage}/>


                                    {/*ERROR*/}
                                    <Route path={Routes.error} component={ErrorPage}/>
                                    <Route path={Routes.test} component={TestPage}/>


                                    <Route path="*" component={NotFoundPage}/>
                                </Switch>
                            </Router>
                        </DndProvider>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
