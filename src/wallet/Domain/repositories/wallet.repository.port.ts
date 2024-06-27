import { Wallet } from "@prisma/client";
import { WalletTransaction } from "@prisma/client";
import { CreateWalletDto } from "src/wallet/Application/dto/create-wallet.dto";
import { CreateWalletDetailDto } from "src/wallet/Application/dto/create-walletDetail.dto";

export interface WalletRepositoryPort {
    getWalletDetail(walletId: number): Promise<any>;
    getWalletById(walletId: number): Promise<Wallet>;
    listWallet(): Promise<any>;
    listWalletDetail(walletId:number): Promise<any>;
}