import HttpFeedbackMap from "./HttpFeedbackMap";
import RequestFeedback from "./ResponseFeedback";

export type RestResponse<T> = Promise<RestSuccessResponse<T> | RestErrorResponse>;

export interface RestSuccessResponse<T> {
    status: number;
    statusText?: string;
    success: true;
    feedback: RequestFeedback;
    value: T;
}

export interface RestErrorResponse {
    status: number;
    statusText?: string;
    success: false;
    feedback: RequestFeedback;
}

export type ErrorResponseJson = {
    statusCode?: string;
    errorCode?: string;
    severity?: RequestSeverity;
    message: string;
    stacktrace: string;
};


export type RequestSeverity = 'success' | 'info' | 'error' | 'warning';


export const responseFromError = (status: number, errorResponse?: ErrorResponseJson | string): RestErrorResponse => ({
    status: status,
    success: false,
    feedback: {
        ...HttpFeedbackMap[status],
        ...typeof errorResponse === 'string' ? {message: errorResponse} : errorResponse,
    }
});


export default RestResponse;