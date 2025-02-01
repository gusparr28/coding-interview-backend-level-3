import type { Request, ResponseToolkit } from "@hapi/hapi";
import { ItemsService } from "../services/items.service";
import { CreateItemUC } from "../services/use-cases/create-item.uc";
import { ItemsRepository } from "../models/repositories/items.repository";
import { DBConnection } from "../../database/connection";
import { SelectItemUC } from "../services/use-cases/select-item.uc";
import { UpdateItemUC } from "../services/use-cases/update-item.uc";
import { DeleteItemUC } from "../services/use-cases/delete-item.uc";
import { errorHandler } from "../../common/errors/handlers/error.handler";

const dbConnection = new DBConnection();
const itemsRepository = new ItemsRepository(dbConnection);
const createItemUC = new CreateItemUC(itemsRepository);
const selectItemUC = new SelectItemUC(itemsRepository);
const updateItemUC = new UpdateItemUC(itemsRepository, selectItemUC);
const deleteItemUC = new DeleteItemUC(itemsRepository, selectItemUC);
const itemsService = new ItemsService(createItemUC, selectItemUC, updateItemUC, deleteItemUC);

export const getItems = async (_, h: ResponseToolkit) => {
    try {
        const items = await itemsService.getAll();

        return h.response(items).code(200);
    } catch (error) {
        const { errors, statusCode } = errorHandler(error);

        return h
            .response({
                errors,
            })
            .code(statusCode);
    }
};

export const createItem = async (req: Request, h: ResponseToolkit) => {
    const { name, price } = req.payload as { name: string; price: number };

    try {
        const createdItem = await itemsService.create({ name, price });

        return h.response(createdItem).code(201);
    } catch (error) {
        const { errors, statusCode } = errorHandler(error);

        return h
            .response({
                errors,
            })
            .code(statusCode);
    }
};

export const getItemById = async (req: Request, h: ResponseToolkit) => {
    const { id } = req.params as { id: number };

    try {
        const itemById = await itemsService.getById(id);

        return h.response(itemById).code(200);
    } catch (error) {
        const { errors, statusCode } = errorHandler(error);
        return h.response(errors).code(statusCode);
    }
};

export const updateItem = async (req: Request, h: ResponseToolkit) => {
    const { id } = req.params as { id: number };
    const { name, price } = req.payload as { name: string; price: number };

    try {
        const updatedItem = await itemsService.update(id, {
            name,
            price,
        });

        return h.response(updatedItem).code(200);
    } catch (error) {
        const { errors, statusCode } = errorHandler(error);

        return h
            .response({
                errors,
            })
            .code(statusCode);
    }
};

export const deleteItem = async (req: Request, h: ResponseToolkit) => {
    const { id } = req.params as { id: number };

    try {
        await itemsService.delete(id);

        return h.response(null).code(204);
    } catch (error) {
        const { errors, statusCode } = errorHandler(error);

        return h
            .response({
                errors,
            })
            .code(statusCode);
    }
};
