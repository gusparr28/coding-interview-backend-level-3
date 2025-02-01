import type { Server } from "@hapi/hapi";

import { getItems, createItem, getItemById, updateItem, deleteItem } from "./items/controllers/items.controller";

const ping = () => {
    return {
        ok: true,
    };
};

export const defineRoutes = (server: Server) => {
    server.route({
        method: "GET",
        path: "/ping",
        handler: ping,
    });

    server.route({
        method: "GET",
        path: "/items",
        handler: getItems,
    });

    server.route({
        method: "POST",
        path: "/items",
        handler: createItem,
    });

    server.route({
        method: "GET",
        path: "/items/{id}",
        handler: getItemById,
    });

    server.route({
        method: "PUT",
        path: "/items/{id}",
        handler: updateItem,
    });

    server.route({
        method: "DELETE",
        path: "/items/{id}",
        handler: deleteItem,
    });
};
