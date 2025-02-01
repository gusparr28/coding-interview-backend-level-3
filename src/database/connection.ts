import { Pool } from "pg";
import { Environment } from "../environment";

export class DBConnection {
    private pool: Pool;

    private databaseUrl: string;

    constructor() {
        this.databaseUrl = new Environment().getDatabaseUrl();
        this.pool = new Pool({
            connectionString: this.databaseUrl,
        });
    }

    getPool(): Pool {
        if (!this.pool) {
            throw new Error("Database pool not set");
        }

        return this.pool;
    }
}
