import { Module } from "@nestjs/common";
import { ApplicationWalletModule } from "../Application/application.module";
import { WalletController } from "./controllers/wallet.controller";
import { CommonModule } from "src/common/common.module";
import { AuthorizationModule } from "src/authorization/authorization.module";

@Module({
    imports: [ApplicationWalletModule, CommonModule, AuthorizationModule],
    controllers: [WalletController],
    providers: [],
    exports: [],
    })
export class InfrastructureWalletModule {}