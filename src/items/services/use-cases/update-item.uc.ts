import type { ItemsRepository } from "../../models/repositories/items.repository";
import { Item } from "../../models/entities/item.entity";
import { ItemDTO } from "../dtos/responses/item.dto";
import { BusinessError } from "../../../common/errors/business.error";
import type { CreateItemDTO } from "../dtos/requests/create-item.dto";
import type { SelectItemUC } from "./select-item.uc";

export class UpdateItemUC {
    constructor(
        private readonly itemsRepository: ItemsRepository,
        private readonly selectItemUC: SelectItemUC,
    ) {}

    async execute(id: number, dto: CreateItemDTO): Promise<ItemDTO> {
        await this.selectItemUC.selectById(id);

        const ofItem = UpdateItemUC.ofItem(id, dto);

        const updatedItem = await this.itemsRepository.update(ofItem);

        return ItemDTO.valueOf(updatedItem);
    }

    static ofItem(id: number, dto: CreateItemDTO): Item {
        const { name, price } = dto;

        if (price < 0) {
            throw new BusinessError([
                {
                    field: "price",
                    message: `Field "price" cannot be negative`,
                },
            ]);
        }

        return new Item(name, price, id);
    }
}
