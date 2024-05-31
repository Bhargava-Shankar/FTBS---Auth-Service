import {StatusCodes} from "http-status-codes"
export class AppError extends Error{
    statusCode: number
    constructor(message: string,statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export const successResponse = {
    status: "success",
    data: {},
    message:{}
}

export const errorResponse = {
    status: "error",
    data: {},
    message: {}
}