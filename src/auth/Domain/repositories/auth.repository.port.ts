import { LogUserDto } from 'src/auth/Application/dto/log-user.dto';

export interface AuthRepositoryPort {
    logUser(logUserDto: LogUserDto): Promise<any>;
    validateUser(logUserDto: LogUserDto): Promise<any>;
}