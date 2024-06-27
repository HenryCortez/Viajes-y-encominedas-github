import { Inject, Injectable } from "@nestjs/common";
import { WalletRepositoryPort } from "src/wallet/Domain/repositories/wallet.repository.port";

@Injectable()
export class GetWalletDetailUsecase {
  constructor(
    @Inject('WalletRepository') private walletRepository: WalletRepositoryPort
  ) {}

  async execute(walletId: number) {
    return await this.walletRepository.getWalletDetail(walletId);
  }
}