import Routes from './Routes';
import React from "react";
import UserLineIcon from "remixicon-react/UserLineIcon";
import {RemixiconReactIconComponentType} from "remixicon-react";
import ProfilePage from "../pages/ProfilePage";
import HomeLineIcon from "remixicon-react/HomeLineIcon";
import HomeLandingPage from "../pages/home_landing/HomeLandingPage";
import LifeMapPage from "../pages/lifemap/LifeMapPage";
import RoutinePage from "../pages/habits/RoutinePage";
import ChallengeListPage from "../pages/challenges/ChallengeListPage";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import RepeatLineIcon from "remixicon-react/RepeatLineIcon";
import Map2LineIcon from "remixicon-react/Map2LineIcon";

export interface ActionNavItem {
    name: string;
    path: string;
    component?: React.ReactNode;
}


export interface NavItem {
    name: string;
    showRedDot?: boolean;
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
        name: "Home",
        icon: HomeLineIcon,
        path: Routes.homeLanding,
        component: HomeLandingPage,
    },
    {
        name: "Challenges",
        icon: CheckLineIcon,
        path: Routes.challenges,
        component: ChallengeListPage,
    },
    // {
    //     name: "Agenda",
    //     icon: HomeLineIcon,
    //     path: Routes.agenda,
    //     component: AgendaPage,
    // },
    {
        name: "Routine",
        icon: RepeatLineIcon,
        path: Routes.habits,
        component: RoutinePage,
    },
    {
        name: "Life map",
        icon: Map2LineIcon,
        path: Routes.lifeMap,
        component: LifeMapPage,
    },
    // {
    //     name: "30 Day Challenge",
    //     icon: HomeLineIcon,
    //     path: Routes.challenges30Day,
    //     component: Challenge30DayPage,
    // },
];


export const profile: NavItem = {
    icon: UserLineIcon,
    name: 'Profil',
    scroll: true,
    path: Routes.profile,
    component: ProfilePage,
};


export default useNavigationList;
