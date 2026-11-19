var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class UsuarioUpdateDto {
}
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MaxLength(255)
], UsuarioUpdateDto.prototype, "nome", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    MaxLength(255)
], UsuarioUpdateDto.prototype, "email", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MinLength(8),
    MaxLength(255)
], UsuarioUpdateDto.prototype, "senha", void 0);
//# sourceMappingURL=usuarioUpdateDto.js.map