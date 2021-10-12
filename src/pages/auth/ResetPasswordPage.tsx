import React from "react";
import {Box, Divider, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ResetPasswordForm from "./ResetPasswordForm";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(8, 4),
        paddingTop: theme.spacing(4),
        alignItems: 'center',
    },
}));

const ResetPasswordPage: React.FC = () => {
    const classes = useStyles();

    return(
                <Box display={'flex'} flexDirection={'column'} className={classes.root}>
                    <Typography component="h2" variant="h5">
                        {"Nulstil adgangskode"}
                    </Typography>

                    <Typography variant="subtitle1">
                        {"Indtast din nye adgangskode"}
                    </Typography>

                    <Box mt={3} mb={3}>
                        <Divider orientation="horizontal" variant="fullWidth"/>
                    </Box>
                    <ResetPasswordForm/>
                </Box>
    );
};

export default ResetPasswordPage;