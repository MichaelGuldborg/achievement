import RequestFeedback from "./ResponseFeedback";

export const HttpFeedbackMap: { [p: string]: RequestFeedback } = {
    200: {
        severity: 'success',
        errorCode: 'success/ok',
        message: 'OK',
    },
    201: {
        severity: 'success',
        errorCode: 'success/created',
        message: 'Created',

    },
    202: {
        severity: 'success',
        errorCode: 'success/accepted',
        message: 'Accepted',
    },
    400: {
        severity: 'warning',
        errorCode: 'client/bad-request',
        message: 'Bad Request',
    },
    401: {
        severity: 'warning',
        errorCode: 'client/unauthorized',
        message: 'Unauthorized',
    },
    402: {
        severity: 'warning',
        errorCode: 'client/payment-required',
        message: 'Payment Required',
    },
    403: {
        severity: 'warning',
        errorCode: 'client/forbidden',
        message: 'Du har ikke tilladlse til denne handling',
    },
    404: {
        severity: 'warning',
        errorCode: 'client/not-found',
        message: 'Not Found',
    },
    408: {
        severity: 'error',
        errorCode: 'client/request-timeout',
        message: 'Vi kunne ikke oprette forbindelse til serveren, prøv igen',
    },
    426: {
        severity: 'warning',
        errorCode: 'client/update-required',
        message: 'Update Required',
    },
    429: {
        severity: 'warning',
        errorCode: 'client/too-many-requests',
        message: 'Too Many Requests',
    },
    451: {
        severity: 'warning',
        errorCode: 'client/unavailable-for-legal-reasons',
        message: 'Unavailable For Legal Reasons',
    },
    500: {
        severity: 'error',
        errorCode: 'server/internal-server-error',
        message: 'Internal Server Error',
    },
    501: {
        severity: 'error',
        errorCode: 'server/not-implemented',
        message: 'Not Implemented',
    },
    502: {
        severity: 'error',
        errorCode: 'server/bad-gateway',
        message: 'Bad Gateway',
    },
    503: {
        severity: 'error',
        errorCode: 'server/service-unavailable',
        message: 'Service Unavailable',
    },
    504: {
        severity: 'error',
        errorCode: 'server/gateway-timeout',
        message: 'Gateway Timeout',
    },
    505: {
        severity: 'error',
        errorCode: 'server/http-version-not-supported',
        message: 'HTTP Version Not Supported',
    },
    511: {
        severity: 'error',
        errorCode: 'server/network-authentication-required',
        message: 'Network Authentication Required',
    }

};

export default HttpFeedbackMap;
