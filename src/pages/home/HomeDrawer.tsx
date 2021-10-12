import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Divider, Hidden} from "@material-ui/core";
import {useNavigationList} from "../../constants/NavigationList";
import SignOutIcon from 'remixicon-react/LogoutCircleLineIcon';
import DrawerButton from "./DrawerButton";
import {CustomTheme} from "../../constants/theme";
import history from "../../history";
import Routes from "../../constants/Routes";

const useStyles = makeStyles<CustomTheme>((theme) => ({
    drawer: {
        width: theme.custom.drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: theme.custom.drawerWidth,
        border: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,.09)',
        overflowX: 'hidden',
    },
    drawerTop: {
        padding: theme.spacing(0, 2),
        height: theme.custom.appBarHeight
    }
}));

interface DashboardDrawerProps {
    mobileOpen: boolean;
    onMobileToggle: () => void;
}

export const HomeDrawer: React.FC<DashboardDrawerProps> = ({mobileOpen, onMobileToggle}) => {
    const classes = useStyles();
    const navigationList = useNavigationList();


    const content = (
        <Box display="flex" flexDirection="column" flexGrow={1}>
            <div className={classes.drawerTop}>
                {/*<ProjectSelector/>*/}
            </div>
            <Divider/>
            {navigationList.map((item) =>
                <DrawerButton
                    key={item.path}
                    item={item}
                    onToggle={onMobileToggle}
                />
            )}
            <Box flex={1}/>
            <DrawerButton
                onClick={() => history.push(Routes.landing)}
                iconColor="#84909c"
                textColor="#84909c"
                item={{
                    name: 'Log ud',
                    icon: SignOutIcon,
                    path: '',
                }}
            />
        </Box>
    )

    return (
        <nav className={classes.drawer} aria-label="navigation">
            <Hidden smUp implementation="css">
                <Drawer
                    container={window !== undefined ? () => window.document.body : undefined}
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={onMobileToggle}
                    classes={{paper: classes.drawerPaper}}
                    // Better open performance on mobile.
                    ModalProps={{keepMounted: true}}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{paper: classes.drawerPaper}}
                    variant="permanent"
                    open
                >
                    {content}
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default HomeDrawer;



