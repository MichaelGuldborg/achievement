import Tag from "./Tag";
import Region from "./Region";
import Municipality from "./Municipality";
import ProjectChannel from "./ProjectChannel";

export interface Postal {
    name: string,
    number: number,
}

export interface Location {
    region: Region,
    municipality: Municipality,
    postal: Postal,
}

export interface Project {
    id: string;
    name: string;
    features: { [p: string]: boolean };
    featureIds: string[];
    groupId?: string;
    slogan: string,
    description: string,
    logo: string,
    color: string,
    colorHex: string,
    tags: Tag[],
    tagIds: string[],
    municipalityId?: string;
    postalCode?: string;
    regionId?: string;
    chatEnabled?: boolean;
    channels?: ProjectChannel[],
    location?: Location,
}

export const emptyProject: Project = {
    id: "",
    name: "",
    groupId: "",
    features: {},
    featureIds: [],
    color: "",
    colorHex: "",
    description: "",
    logo: "",
    slogan: "",
    tags: [],
    tagIds: [],
    municipalityId: "",
    regionId: "",
    postalCode: "",
    channels: [],
    location: undefined,
}

export default Project;