export class ValidationError extends Error {
    constructor(errors, ...params) {
        console.log("hello from ValidationError");

        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError)
        }
        this.name = "ValidationError"
        this.errors = errors;

    }
};
