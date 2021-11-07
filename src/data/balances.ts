import HeartLineIcon from "remixicon-react/HeartLineIcon";
import {RemixiconReactIconComponentType} from "remixicon-react";
import GroupLineIcon from "remixicon-react/GroupLineIcon";
import TreasureMapLineIcon from "remixicon-react/TreasureMapLineIcon";
import HomeSmileLineIcon from "remixicon-react/HomeSmileLineIcon";
import RunLineIcon from "remixicon-react/RunLineIcon";
import BookOpenLineIcon from "remixicon-react/BookOpenLineIcon";
import StarLineIcon from "remixicon-react/StarLineIcon";
import MentalHealthLineIcon from "remixicon-react/MentalHealthLineIcon";
import BriefcaseLineIcon from "remixicon-react/BriefcaseLineIcon";
import LightbulbLineIcon from "remixicon-react/LightbulbLineIcon";
import ParentLineIcon from "remixicon-react/ParentLineIcon";
import CommunityLineIcon from "remixicon-react/CommunityLineIcon";


export type BalanceType = 'love'
    | 'friendship'
    | 'adventure'
    | 'environment'
    | 'physical-health'
    | 'intellect'
    | 'skills'
    | 'spiritual'
    | 'career'
    | 'creative'
    | 'family'
    | 'community';

export interface Balance {
    id: BalanceType;
    name: string;
    description?: string;
    icon: RemixiconReactIconComponentType;
    color?: string;
}


export const balances: Balance[] = [{
    id: 'love',
    name: 'Love',
    // name: 'Love relationships',
    // description: 'Date nights'
    description: 'This is a measure of how happy you are in your current state of relationship – whether you are single and loving it, in a relationship, dating or desiring a relationship.',
    icon: HeartLineIcon,
    color: '#f44336'
}, {
    id: 'friendship',
    name: 'Friendships',
    // description: 'calling close friends, getting together for dinner'
    description: 'This is a measure of how strong a support network you have. Do you have at least 5 people who you know have your back, and you just love being around (mostly!)?',
    icon: GroupLineIcon,
    color: '#F4511E'
}, {
    id: 'adventure',
    name: 'Adventures',
    // description: 'Holidays, trips / year, new event / month'
    description: 'How much time do you get to travel, experience the world and do things that open you up to new experiences and excitement?',
    icon: TreasureMapLineIcon,
    color: '#7CB342'
}, {
    id: 'environment',
    name: 'Environment',
    // description: 'Make bed, no dirty dishes, trashcan',
    description: 'This is the quality of your home, your car, your office and the general spaces where you spend your time during the day and night (eg: café’s, bars, schools, etc), even when travelling.',
    icon: HomeSmileLineIcon,
    color: '#2196f3'
}, {
    id: 'physical-health',
    name: 'Physical health',
    // description: 'Fitness, food routine, push-ups',
    description: 'How would you rate your health, given your age and any physical conditions?',
    icon: RunLineIcon,
    color: '#F09300'
}, {
    id: 'intellect',
    name: 'Intellect',
    // description: 'Reading books',
    description: 'How much time do you set aside to learn new things, and how fast are you learning? How many books do you read/podcasts do you listen to/tutorials do you watch? How many seminars to you attend yearly? Are you seeking to learn from others?',
    icon: BookOpenLineIcon,
    color: '#009688'
}, {
    id: 'skills',
    name: 'Skills',
    description: 'How fast are you improving the skills that make you unique and help you build a successful career, or enjoy a meaningful past time? Are you growing towards mastery or stagnating?',
    icon: StarLineIcon,
    color: '#3f51b5',
}, {
    id: 'spiritual',
    name: 'Spirituality',
    // description: 'Medidation, Journaling',
    description: 'How much time do you devote to spiritual, meditative, or contemplative practices that keep you feeling connected, balanced and peaceful?',
    icon: MentalHealthLineIcon,
    color: '#9c27b0',
}, {
    id: 'career',
    name: 'Career',
    // description: 'Join group, attend events',
    description: 'Are you growing, progressing and excelling? Or do you feel stuck in a rut? If you have a business, is it thriving or stagnating?',
    icon: BriefcaseLineIcon,
    color: '#3f51b5',
}, {
    id: 'creative',
    name: 'Creativity',
    // description: 'Journal, Paint, Writing',
    description: 'Do you paint, write, play music, or engage in other activities that channel your creativity? Or are you more of a consumer than a creator?',
    icon: LightbulbLineIcon,
    color: '#e91e63' // ed4b82
}, {
    id: 'family',
    name: 'Family',
    // description: 'Call family',
    description: 'How is your relationship with your partner, parents and siblings? If you don’t have immediate family, how is your relationship with your alternate family (dearest friends, extended family)?',
    icon: ParentLineIcon,
    color: '#AD1457',
}, {
    id: 'community',
    name: 'Community',
    // description: 'Volunteer, Donations',
    description: 'Are you giving, contributing and playing a definite role in your community?',
    icon: CommunityLineIcon,
    color: '#8bc34a'
}]


export default balances;