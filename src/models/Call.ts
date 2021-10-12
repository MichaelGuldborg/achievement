interface Call {
    id: string;
    used: boolean;
    startedAt: Date | undefined;
    endedAt: Date | undefined;
    durationInMilliSeconds: number | undefined;
    redirects: { [p: string]: string };
    createdAt: Date;
    updatedAt: Date;
}

export default Call;