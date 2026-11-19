var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class UsuarioCreateDto {
}
__decorate([
    IsString(),
    IsNotEmpty(),
    MaxLength(255)
], UsuarioCreateDto.prototype, "nome", void 0);
__decorate([
    IsEmail(),
    MaxLength(255)
], UsuarioCreateDto.prototype, "email", void 0);
__decorate([
    IsString(),
    MinLength(8),
    MaxLength(255)
], UsuarioCreateDto.prototype, "senha", void 0);
//# sourceMappingURL=usuarioCreateDto.js.map