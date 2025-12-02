

export class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ObjectNotFound extends CustomError {
    constructor(message: string = "La ressource n'existe pas.") {
        super(message);
    }
}