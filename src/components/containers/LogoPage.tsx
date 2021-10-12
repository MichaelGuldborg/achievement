import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Box, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import VersionTag from "../../components/displays/VersionTag";
import LogoIcon from "../../assets/Icon_white_500px.png"

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        background: "linear-gradient(45deg, rgba(148,45,196,1) 0%, rgba(8,126,225,1) 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        padding: theme.spacing(6, 6),
    },
    imgWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '20%',
        height: '20%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url("${LogoIcon}")`,
        backgroundSize: 'contain',
    }
}));

const LogoPage: React.FC = ({children}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={false} sm={4} md={7} lg={8} className={classes.image}>
                <div className={classes.imgWrapper}>
                    <div className={classes.img}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={5} lg={4}>
                <Paper elevation={12} square className={classes.content}>
                    <Box
                        width='100%'
                        height='100%'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        style={{position: 'relative'}}
                    >
                        <div className={classes.form}>
                            {children}
                        </div>
                        <VersionTag/>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}


export default LogoPage;

