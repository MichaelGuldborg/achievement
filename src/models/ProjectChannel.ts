
export interface ProjectChannel {
    id: string;
    name: string;
    info: string;
    url: string;
}

export const projectChannelIds = [
    {
        id: "web",
        name: "Hjemmeside",
    },
    {
        id: "phone",
        name: "Telefon",
    },
    {
        id: "sms",
        name: "SMS",
    },
    {
        id: "physical",
        name: "Fysisk samtale",
    },
    {
        id: "chat",
        name: "Online chat",
    },
    {
        id: "email",
        name: "Email",
    },
];

export const emptyProjectChannel: ProjectChannel = {
    id: "",
    name: "",
    info: "",
    url: "",
}

export default ProjectChannel;