export class Environment {
    private readonly port: number;
    private readonly databaseUrl: string;
    private readonly nodeEnv: string;
    private readonly host: string;

    constructor() {
        this.host = process.env.HOST || "localhost";
        this.port = Number(process.env.PORT || 3000);
        this.databaseUrl = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/eldo";
        this.nodeEnv = process.env.NODE_ENV || "development";
    }

    public getHost(): string {
        return this.host;
    }

    public getPort(): number {
        return this.port;
    }

    public getDatabaseUrl(): string {
        if (!this.databaseUrl) {
            throw new Error("DATABASE_URL is not set in the environment");
        }

        return this.databaseUrl;
    }

    public getNodeEnv(): string {
        if (!this.nodeEnv) {
            throw new Error("NODE_ENV is not set in the environment");
        }

        return this.nodeEnv;
    }
}
