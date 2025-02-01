import type { ItemsRepository } from "../../models/repositories/items.repository";
import type { CreateItemDTO } from "../dtos/requests/create-item.dto";
import { ItemDTO } from "../dtos/responses/item.dto";
import { BusinessError } from "../../../common/errors/business.error";
import { Item } from "../../models/entities/item.entity";

export class CreateItemUC {
    constructor(private readonly itemsRepository: ItemsRepository) {}

    async execute(dto: CreateItemDTO): Promise<ItemDTO> {
        const ofItem = CreateItemUC.ofItem(dto);

        const savedItem = await this.itemsRepository.save(ofItem);

        return ItemDTO.valueOf(savedItem);
    }

    static ofItem(dto: CreateItemDTO): Item {
        const { name, price } = dto;

        if (!name) {
            throw new BusinessError(
                [
                    {
                        field: "name",
                        message: `Field "name" is required`,
                    },
                ],
                400,
            );
        }

        if (!price) {
            throw new BusinessError(
                [
                    {
                        field: "price",
                        message: `Field "price" is required`,
                    },
                ],
                400,
            );
        }

        if (price < 0) {
            throw new BusinessError([
                {
                    field: "price",
                    message: `Field "price" cannot be negative`,
                },
            ]);
        }

        return new Item(name, price);
    }
}
