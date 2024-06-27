import { Module } from "@nestjs/common";
import { ApplicationWalletModule } from "./Application/application.module";
import { DomainWalletModule } from "./Domain/domain.module";
import { InfrastructureWalletModule } from "./Infraestructure/infraestructure.module";

@Module({
  imports: [ApplicationWalletModule, DomainWalletModule, InfrastructureWalletModule],

  exports: [ApplicationWalletModule],
})
export class WalletModule {}