import {randomInt} from "./rand";

export const randomId = (): string => {
    return '' + randomInt(1000000)
}