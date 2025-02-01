import { BusinessError, type Errors } from "../business.error";

type ErrorHandler = {
    statusCode: number;
    errors: Errors[];
};

export const errorHandler = (error: BusinessError): ErrorHandler => {
    console.error("error", error);

    if (error instanceof BusinessError) {
        return {
            statusCode: error.statusCode,
            errors: error.errors,
        };
    }

    return {
        statusCode: 500,
        errors: [
            {
                message: "Internal Server Error",
            },
        ],
    };
};
