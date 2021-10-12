export interface ParticipantType {
    id: string;
    name: string;
    color: string;
}


export const emptyParticipantType: ParticipantType = {
    id: '',
    name: '',
    color: '',
};

export interface Participant {
    id: string;
    name: string;
    imageUrl?: string;
    attending?: boolean;
    status?: ParticipantStatus;
    color?: string;
}


export enum ParticipantStatus {
    NULL,
    CONFIRMED,
    MAYBE,
    CANCELLED
}

export const emptyParticipant: Participant = {
    id: '',
    name: '',
    attending: false,
};



