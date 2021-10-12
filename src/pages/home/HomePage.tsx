import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeSwitch from "./HomeSwitch";


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
    },
    content: {
        minHeight: '100vh',
        maxWidth: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        backgroundColor: '#F1F5F9',
    },
    switch: {
        flex: 1,
        position: 'relative',
        display: 'flex',
    },
    list: {
        display: 'flex',
        background: 'white',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        boxShadow: '0 -2px 5px rgba(0,0,0,.09)',
        justifyContent: 'space-evenly'
    },
    signOut: {display: 'flex', flexDirection: 'column'},
}))

export const HomePage = () => {
    const classes = useStyles();


    // mobile drawer handling
    // const theme = useTheme();
    // const mobile = useMediaQuery(theme.breakpoints.down("sm"))
    // const [mobileOpen, setMobileOpen] = React.useState(false);
    // const handleDrawerToggle = () => {
    //     if (mobile) setMobileOpen(!mobileOpen);
    // }


    return (
        <div className={classes.root}>
            {/*<HomeDrawer mobileOpen={mobileOpen} onMobileToggle={handleDrawerToggle}/>*/}
            <div className={classes.content}>
                <div className={classes.switch}>
                    <HomeSwitch/>
                </div>
            </div>
        </div>
    )
}


export default HomePage;