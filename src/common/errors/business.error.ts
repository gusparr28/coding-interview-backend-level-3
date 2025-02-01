export type Errors = {
    field?: string;
    message: string;
};

export class BusinessError {
    public errors: Errors[];

    public statusCode: number;

    constructor(errors: Errors[], statusCode = 400) {
        this.errors = errors;
        this.statusCode = statusCode;
    }
}
