import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import * as Usecases from "./usecases/index";
import { PrismaWalletRepositoryAdapter } from "../Infraestructure/repositories/prisma.wallet.repository.adapter";

@Module({
  imports: [CommonModule],
  providers: [
    ...Object.values(Usecases),
    {
      provide: 'WalletRepository',
      useClass: PrismaWalletRepositoryAdapter,
    },
  ],
  exports: [
    ...Object.values(Usecases),
    'WalletRepository',
  ],
})
export class ApplicationWalletModule {}