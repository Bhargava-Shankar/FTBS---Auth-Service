import {StatusCodes} from "http-status-codes"
class AppError extends Error{
    message: string
    statusCode: number
    constructor(message: string) {
        super(message)
        this.message = message;
        this.statusCode = StatusCodes.NOT_IMPLEMENTED
    }
}