import type { ItemsRepository } from "../../models/repositories/items.repository";
import type { SelectItemUC } from "./select-item.uc";

export class DeleteItemUC {
    constructor(
        private readonly itemsRepository: ItemsRepository,
        private readonly selectItemUC: SelectItemUC,
    ) {}

    async execute(id: number): Promise<void> {
        await this.selectItemUC.selectById(id);

        await this.itemsRepository.delete({ id });
    }
}
