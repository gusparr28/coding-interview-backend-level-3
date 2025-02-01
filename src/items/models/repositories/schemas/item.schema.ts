import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const ItemSchema = pgTable("items", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    price: integer("price").notNull(),
});
