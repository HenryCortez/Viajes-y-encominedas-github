import { Inject, Injectable } from "@nestjs/common";
import { WalletRepositoryPort } from "src/wallet/Domain/repositories/wallet.repository.port";

@Injectable()
export class ListWalletUsecase {
    constructor(
        @Inject('WalletRepository') private walletRepository: WalletRepositoryPort
    ) { }

    async execute() : Promise<any>{
        return await this.walletRepository.listWallet();
    }
}