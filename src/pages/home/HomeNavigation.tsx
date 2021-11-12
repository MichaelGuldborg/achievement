import React from "react";
import {Button, Hidden, IconButton, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import {useNavigationList} from "../../constants/NavigationList";
import history from "../../history";
import Paper from "@material-ui/core/Paper";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Menu from "@material-ui/core/Menu";
import {matchPath} from "react-router";
import Routes from "../../constants/Routes";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import Divider from "@material-ui/core/Divider";
import LogoutBoxLineIcon from "remixicon-react/LogoutBoxLineIcon";


interface DashboardDrawerProps {
    mobileOpen: boolean;
    onMobileToggle: () => void;
}

export const HomeNavigation: React.FC<DashboardDrawerProps> = () => {
    const navigationList = useNavigationList();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const currentPath = window.location.pathname;
    const currentNavItem = navigationList.find((item) => !!item.path && !!matchPath(currentPath, {path: item.path}))

    return (
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100}}>
            <Paper style={{padding: '8px 16px'}}>
                <Hidden smDown>
                    {navigationList.map((item) => {
                            // const isCurrentPath = !!item.path && !!matchPath(currentPath, {path: item.path});
                            return (
                                <Button
                                    key={item.path}
                                    onClick={() => history.push(item.path)}
                                    color={"primary"}
                                    variant={"text"}
                                >
                                    {item.name}
                                </Button>
                            );
                        }
                    )}
                </Hidden>
                <Hidden mdUp>
                    <div style={{height: 32, display: 'flex', alignItems: 'center'}}>
                        {currentPath === Routes.homeLanding ?
                            <div/> :
                            <IconButton onClick={(e) => {
                                history.goBack();
                            }}>
                                <ArrowLeftLineIcon/>
                            </IconButton>
                        }
                        {currentNavItem && <div style={{fontSize: 18, fontWeight: 600}}>
                            {currentNavItem.name}
                        </div>}
                        <div style={{flex: 1}}/>
                        <IconButton onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                        }}>
                            <MenuLineIcon/>
                        </IconButton>
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={() => setAnchorEl(null)}
                        style={{padding: 0}}
                        MenuListProps={{style: {padding: 0}}}
                    >
                        {navigationList.map((item) => {
                            return (
                                <MenuItem
                                    key={item.path}
                                    onClick={() => {
                                    setAnchorEl(null);
                                    history.push(item.path)
                                }}>
                                    <ListItemIcon>
                                        <item.icon fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText>{item.name}</ListItemText>
                                </MenuItem>
                            )
                        })}
                        <Divider/>
                        <MenuItem>
                            <ListItemIcon onClick={() => {
                                setAnchorEl(null);
                                localStorage.clear();
                                history.push(Routes.landing)
                            }}>
                                <LogoutBoxLineIcon/>
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Hidden>
            </Paper>
        </div>
    )
}

export default HomeNavigation;



