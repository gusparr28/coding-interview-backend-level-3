import type { Item } from "../../../models/entities/item.entity";

export class ItemDTO {
    id: number;

    name: string;

    price: number;

    static valueOf(item: Item): ItemDTO {
        const itemDTO = new ItemDTO();

        itemDTO.id = item.id;
        itemDTO.name = item.name;
        itemDTO.price = Number(item.price);

        return itemDTO;
    }
}
