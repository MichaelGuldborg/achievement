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
    severity?: RequestSeverity;
    message: string;
    errorCode?: string;
    stacktrace?: string;
};


export type RequestSeverity = 'success' | 'info' | 'error' | 'warning';


export const errorResponse = (status: number, errorResponse?: ErrorResponseJson | string): RestErrorResponse => ({
    status: status,
    success: false,
    feedback: {
        ...HttpFeedbackMap[status],
        ...typeof errorResponse === 'string' ? {message: errorResponse} : errorResponse,
    }
});

export const successResponse = <T, >(value: T, message?: string): RestSuccessResponse<T> => ({
    status: 200,
    success: true,
    value: value,
    feedback: {
        severity: "success",
        message: message ?? 'success',
    }
});

export default RestResponse;