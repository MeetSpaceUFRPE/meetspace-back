import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    private USER_SERVICE_URL = process.env.USER_SERVICE_URL;

    async register(registerDto: RegisterDto) {
        const { password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const existingUser = await fetch(`${this.USER_SERVICE_URL}/users/email/${registerDto.email}`);
            if (existingUser.status === 200) return new ConflictException('Usuário já cadastrado');

            const response = await fetch(`${this.USER_SERVICE_URL}/users`, {
                method: 'POST',
                body: JSON.stringify({
                    ...registerDto,
                    password: hashedPassword,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            return response.json();
        } catch (error) {
            throw new ConflictException('Usuário já cadastrado');
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        try {
            const response = await fetch(`${this.USER_SERVICE_URL}/users/email/${email}`);
            const user = await response.json();
            
            if (user && (await bcrypt.compare(password, user.password))) {
                const payload = { id: user.id, email: user.email };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            } else {
                throw new UnauthorizedException('Credenciais inválidas');
            }
        } catch (error) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    }
}
