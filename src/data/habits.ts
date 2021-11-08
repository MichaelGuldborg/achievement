import {randomId} from "../lib/math/randomId";
import Habit from "../models/Habit";


export const habits: Habit[] = [{
    id: '0',
    name: 'Make the bed',
    type: 'environment',
    isDaily: true,
    timeOfDay: '09:00',
}, {
    id: '1',
    name: 'Brush teeth',
    // type: 'physical-health',
    isDaily: true,
    timeOfDay: '22:00',
}, {
    id: '2',
    name: 'Bouldering',
    type: 'physical-health',
    secondaryTypes: ['friendship'],
    dayOfWeek: 'monday',
    timeOfDay: '17:00',
}, {
    id: '3',
    name: 'Bouldering',
    type: 'physical-health',
    secondaryTypes: ['friendship'],
    dayOfWeek: 'wednesday',
    timeOfDay: '17:00',
}, {
    id: '4',
    name: 'Running',
    type: 'physical-health',
    dayOfWeek: 'sunday',
    timeOfDay: '15:00',
}, {
    id: '5',
    name: 'Change bedsheets',
    type: 'environment',
    isMonthly: true,
    dayOfWeek: 'sunday',
    timeOfDay: '11:00',
}, {
    id: randomId(),
    name: 'Dinner club',
    type: 'friendship',
    isMonthly: true,
    dayOfWeek: 'monday',
    timeOfDay: '18:00',
}, {
    id: randomId(),
    name: 'Phone call with dad',
    type: 'family',
    isMonthly: true,
    dayOfWeek: 'monday',
    timeOfDay: '18:00',
}, {
    id: randomId(),
    name: 'School',
    type: 'intellect',
    secondaryTypes: ['friendship'],
    dayOfWeek: 'wednesday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Read a book',
    type: 'intellect',
    isMonthly: true,
    dayOfWeek: 'wednesday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Minejendom',
    type: 'career',
    secondaryTypes: ['creative'],
    isDaily: false,
    isMonthly: false,
    dayOfWeek: 'tuesday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Innosocial',
    type: 'career',
    secondaryTypes: ['creative'],
    isDaily: false,
    isMonthly: false,
    dayOfWeek: 'monday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Innosocial',
    type: 'career',
    secondaryTypes: ['creative'],
    isDaily: false,
    isMonthly: false,
    dayOfWeek: 'thursday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Innosocial',
    type: 'career',
    secondaryTypes: ['creative'],
    dayOfWeek: 'friday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Cleanup room',
    type: 'environment',
    dayOfWeek: 'sunday',
    timeOfDay: '10:00',
}, {
    id: randomId(),
    name: 'Wash clothes',
    type: 'environment',
    isMonthly: true,
    dayOfWeek: 'friday',
    timeOfDay: '18:00',
}, {
    id: randomId(),
    name: 'Attend a concert',
    type: 'adventure',
    isMonthly: true,
    dayOfWeek: 'friday',
    timeOfDay: '18:00',
}, {
    id: randomId(),
    name: 'Vacation with Maja',
    type: 'family',
    isYearly: true,
    dayOfWeek: 'monday',
    timeOfDay: '',
}, {
    id: randomId(),
    name: 'Vacation with Harald/Lasse',
    type: 'friendship',
    isYearly: true,
    dayOfWeek: 'monday',
    timeOfDay: '',
}];
export default habits;