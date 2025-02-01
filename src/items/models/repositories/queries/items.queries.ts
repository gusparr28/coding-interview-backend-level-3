export const ITEMS_QUERIES = {
    SAVE_ITEM: "INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *;",
    SELECT_ALL_ITEMS: "SELECT id, name, price FROM items;",
    SELECT_ITEM_BY_ID: "SELECT id, name, price FROM items WHERE id = $1;",
    UPDATE_ITEM: "UPDATE items SET name = $1, price = $2 WHERE id = $3 RETURNING *;",
    DELETE_ITEM: "DELETE FROM items WHERE id = $1;",
};
