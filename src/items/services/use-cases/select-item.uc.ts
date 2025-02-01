import { BusinessError } from "../../../common/errors/business.error";
import type { ItemsRepository } from "../../models/repositories/items.repository";
import { ItemDTO } from "../dtos/responses/item.dto";

export class SelectItemUC {
    constructor(private readonly itemsRepository: ItemsRepository) {}

    async selectAll(): Promise<ItemDTO[]> {
        const items = await this.itemsRepository.selectAll();

        return items.map((item) => ItemDTO.valueOf(item));
    }

    async selectById(id: number): Promise<ItemDTO> {
        const itemById = await this.itemsRepository.selectById({ id });
        if (!itemById) {
            throw new BusinessError(
                [
                    {
                        message: "Item not found for the provided id",
                    },
                ],
                404,
            );
        }

        return ItemDTO.valueOf(itemById);
    }
}
