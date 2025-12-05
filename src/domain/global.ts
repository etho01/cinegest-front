

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

export class ValidationError extends CustomError {
    constructor(message: string = "Une erreur de validation est survenue.") {
        super(message);
    }
}

export class ErrorApi extends CustomError {
    type: string;

    constructor(
        message: string = "Une erreur est survenue lors de la communication avec le serveur.", 
        type : string = "API_ERROR"
    ) {
        super(message);
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}