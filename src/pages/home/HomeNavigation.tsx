import React from "react";
import {Button, Hidden, IconButton, ListItemIcon, ListItemText, MenuItem} from "@material-ui/core";
import {useNavigationList} from "../../constants/NavigationList";
import history from "../../history";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Menu from "@material-ui/core/Menu";
import {matchPath} from "react-router";
import Routes from "../../constants/Routes";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import Divider from "@material-ui/core/Divider";
import LogoutBoxLineIcon from "remixicon-react/LogoutBoxLineIcon";
import useScrollPosition from "@react-hook/window-scroll";


interface DashboardDrawerProps {
    mobileOpen: boolean;
    onMobileToggle: () => void;
}

export const HomeNavigation: React.FC<DashboardDrawerProps> = () => {
    const navigationList = useNavigationList();
    const scrollY = useScrollPosition(60)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const currentPath = window.location.pathname;
    const currentNavItem = navigationList.find((item) => !!item.path && !!matchPath(currentPath, {path: item.path}))


    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: 'all 0.2s ease',
            boxShadow: scrollY > 0 ? 'rgb(0 0 0 / 10%) 0px 2px 4px' : 'none',
            background: scrollY > 0 ? 'white' : 'transparent',
            width: '100vw',
            height: 56,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Hidden smDown>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px 16px',
                }}>
                    {navigationList.map((item) => {
                            // const isCurrentPath = !!item.path && !!matchPath(currentPath, {path: item.path});
                            return (
                                <div style={{marginRight: 8}}>
                                    <Button
                                        key={item.path}
                                        color={"primary"}
                                        variant={"outlined"}
                                        onClick={() => history.push(item.path)}
                                    >
                                        {item.name}
                                    </Button>
                                </div>
                            );
                        }
                    )}
                    <div style={{flex: 1}}/>
                    <Button
                        color={"primary"}
                        variant={"outlined"}
                        onClick={() => {
                            localStorage.clear();
                            history.push(Routes.landing)
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </Hidden>
            <Hidden mdUp>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0px 16px',
                }}>
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
        </div>
    )
}

export default HomeNavigation;



