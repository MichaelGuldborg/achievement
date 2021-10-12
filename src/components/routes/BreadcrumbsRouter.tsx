import React from "react";
import {Box, Breadcrumbs} from "@material-ui/core";
import {Link, useLocation} from "react-router-dom";
import ArrowIcon from 'remixicon-react/ArrowRightSLineIcon';
import makeStyles from "@material-ui/core/styles/makeStyles";

const titleCase = (str: string) => {
    return str.replace(/\w\S*/g, (t) => {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
    });
}

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'grey',
        " &:hover": {
            color: 'black',
        }
    }
}));

const BreadcrumbsRouter = () => {

    const classes = useStyles();
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box pl={2} pr={2}>
            <Breadcrumbs separator={<ArrowIcon size={18}/>} aria-label="breadcrumb">
                Home
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const splitRoutes = to.split("/")
                    const routeName = titleCase(splitRoutes[splitRoutes.length - 1])
                    return last ? (
                        <p key={routeName}>{routeName}</p>
                    ) : (
                        <Link key={routeName} to={to} className={classes.link}>{routeName}</Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    )
}

export default BreadcrumbsRouter