import Routes from './Routes';
import React from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import {RemixiconReactIconComponentType} from "remixicon-react";
import ProfilePage from "../pages/ProfilePage";
import HomeLineIcon from "remixicon-react/HomeLineIcon";
import HomeLandingPage from "../pages/home_landing/HomeLandingPage";
import ActivityPage from "../pages/activity/ActivityPage";

export interface ActionNavItem {
    name: string;
    path: string;
    component?: React.ReactNode;
}

export interface NavItem {
    name: string;
    showRedDot?: boolean;
    checkRedDot?: boolean;
    external?: boolean;
    scroll?: boolean;
    icon: RemixiconReactIconComponentType;
    path: string;
    feature?: string;
    permission?: string;
    startActions?: [ActionNavItem, ...ActionNavItem[]];
    endActions?: [ActionNavItem, ...ActionNavItem[]];
    component: React.ElementType;
}


export const useNavigationList = () => {
    return navigationList;
}


export const navigationList: NavItem[] = [
    {
        name: "Activity",
        icon: HomeLineIcon,
        path: Routes.activity,
        component: ActivityPage,
    },
    {
        name: "Home",
        icon: HomeLineIcon,
        path: Routes.home,
        component: HomeLandingPage,
    },
];


export const profile: NavItem = {
    icon: UserLineIcon,
    name: 'Profil',
    scroll: true,
    path: Routes.profile,
    component: ProfilePage,
};


export default useNavigationList;
