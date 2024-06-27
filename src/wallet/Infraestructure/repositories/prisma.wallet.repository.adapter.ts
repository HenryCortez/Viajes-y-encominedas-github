import { HttpException, Injectable } from "@nestjs/common";
import { Wallet,WalletTransaction, PrismaClient } from "@prisma/client";
import { WalletRepositoryPort } from "src/wallet/Domain/repositories/wallet.repository.port";

import { CreateWalletDto } from "src/wallet/Application/dto/create-wallet.dto";
import { CreateWalletDetailDto } from "src/wallet/Application/dto/create-walletDetail.dto";


@Injectable()
export class PrismaWalletRepositoryAdapter implements WalletRepositoryPort {
    constructor(
        private prisma: PrismaClient
    ) {}
    
    async listWallet () :Promise<any>{
        return await this.prisma.wallet.findMany();
    }

    async listWalletDetail(walletId: number): Promise<any> {
        return await this.prisma.walletTransaction.findMany({
            where: {
                walletId: walletId
            }
        });
    }

    async getWalletDetail(walletDetailId: number): Promise<WalletTransaction> {
        return await this.prisma.walletTransaction.findUnique({
            where: {
                id: walletDetailId
            }
        });
    }

    async getWalletById(walletId: number): Promise<Wallet> {
        return await this.prisma.wallet.findUnique({
            where: {
                id: walletId
            }
        });
    }

}