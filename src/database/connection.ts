import { type NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Environment } from "../environment";

export class DBConnection {
    private pool: Pool;

    private client: NodePgDatabase | null = null;

    constructor() {
        this.pool = new Pool({
            connectionString: new Environment().getDatabaseUrl(),
        });

        this.client = drizzle(this.pool);
    }

    getClient(): NodePgDatabase {
        if (!this.client) {
            throw new Error("Database client not set");
        }

        return this.client;
    }
}
