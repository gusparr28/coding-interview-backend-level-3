import type { DBConnection } from "../../../database/connection";
import { Item } from "../entities/item.entity";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ItemSchema } from "./schemas/item.schema";
import { eq } from "drizzle-orm";

export class ItemsRepository {
    private client: NodePgDatabase;

    constructor(private readonly dbConnection: DBConnection) {
        this.client = this.dbConnection.getClient();
    }

    async save(item: Omit<Item, "id">): Promise<Item> {
        const result = await this.client.insert(ItemSchema).values(item).returning();
        return result[0];
    }

    async selectAll(): Promise<Item[]> {
        return await this.client.select().from(ItemSchema);
    }

    async selectById(item: Pick<Item, "id">): Promise<Item | null> {
        const result = await this.client.select().from(ItemSchema).where(eq(ItemSchema.id, item.id));
        return result[0] ?? null;
    }

    async update(item: Item): Promise<Item> {
        const result = await this.client
            .update(ItemSchema)
            .set({ name: item.name, price: item.price })
            .where(eq(ItemSchema.id, item.id))
            .returning();
        return result[0];
    }

    async delete(item: Pick<Item, "id">): Promise<void> {
        await this.client.delete(ItemSchema).where(eq(ItemSchema.id, item.id));
    }
}
