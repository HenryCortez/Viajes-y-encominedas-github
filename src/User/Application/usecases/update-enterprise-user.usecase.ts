import {Inject, Injectable} from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateEnterpriseUserUseCase {
    constructor(
        @Inject('UserRepository') private userRepository: UserRepositoryPort,
    ) {}
    
    async execute(id: number, enterpriseId:number): Promise<any> {
        const createdUser = await this.userRepository.updateUserEnterprise(id, enterpriseId);
        return createdUser;
    }
}