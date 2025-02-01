import type { Pool } from "pg";
import type { DBConnection } from "../../../database/connection";
import type { Item } from "../entities/item.entity";
import { ITEMS_QUERIES } from "./queries/items.queries";

export class ItemsRepository {
    private pool: Pool;

    constructor(private readonly dbConnection: DBConnection) {
        this.pool = this.dbConnection.getPool();
    }

    async save(item: Omit<Item, "id">): Promise<Item> {
        try {
            const result = await this.pool.query(ITEMS_QUERIES.SAVE_ITEM, [item.name, item.price]);

            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async selectAll(): Promise<Item[]> {
        try {
            const result = await this.pool.query(ITEMS_QUERIES.SELECT_ALL_ITEMS);

            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async selectById(item: Pick<Item, "id">): Promise<Item | null> {
        try {
            const result = await this.pool.query(ITEMS_QUERIES.SELECT_ITEM_BY_ID, [item.id]);

            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(item: Item): Promise<Item> {
        try {
            const result = await this.pool.query(ITEMS_QUERIES.UPDATE_ITEM, [item.name, item.price, item.id]);

            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(item: Pick<Item, "id">): Promise<void> {
        try {
            await this.pool.query(ITEMS_QUERIES.DELETE_ITEM, [item.id]);
        } catch (error) {
            throw new Error(error);
        }
    }
}
