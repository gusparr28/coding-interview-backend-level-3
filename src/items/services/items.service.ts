import type { CreateItemUC } from "./use-cases/create-item.uc";
import type { CreateItemDTO } from "./dtos/requests/create-item.dto";
import type { ItemDTO } from "./dtos/responses/item.dto";
import type { SelectItemUC } from "./use-cases/select-item.uc";
import type { UpdateItemUC } from "./use-cases/update-item.uc";
import type { DeleteItemUC } from "./use-cases/delete-item.uc";

export class ItemsService {
    constructor(
        private readonly createItemUC: CreateItemUC,
        private readonly selectItemUC: SelectItemUC,
        private readonly updateItemUC: UpdateItemUC,
        private readonly deleteItemUC: DeleteItemUC,
    ) {}

    async create(dto: CreateItemDTO): Promise<ItemDTO> {
        return await this.createItemUC.execute(dto);
    }

    async getAll(): Promise<ItemDTO[]> {
        return await this.selectItemUC.selectAll();
    }

    async getById(id: number): Promise<ItemDTO> {
        return await this.selectItemUC.selectById(id);
    }

    async update(id: number, dto: CreateItemDTO): Promise<ItemDTO> {
        return await this.updateItemUC.execute(id, dto);
    }

    async delete(id: number): Promise<void> {
        return await this.deleteItemUC.execute(id);
    }
}
