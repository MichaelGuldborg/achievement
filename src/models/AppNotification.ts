export interface AppNotification {
    id: string;
    type: string;
    action: string;
    itemId: string;
    batchId: string;
    body: string;
    read: boolean;
    createdAt: Date;
}

export const emptyNotification: AppNotification = {
    id: '',
    body: '',
    action: '',
    batchId: '',
    createdAt: new Date(),
    itemId: '',
    read: false,
    type: '',
}

export default AppNotification;