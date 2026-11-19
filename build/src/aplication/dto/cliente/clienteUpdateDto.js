var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class ClienteUpdateDto {
}
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MaxLength(255)
], ClienteUpdateDto.prototype, "nome", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(50)
], ClienteUpdateDto.prototype, "telefone", void 0);
__decorate([
    IsOptional(),
    IsEmail(),
    MaxLength(255)
], ClienteUpdateDto.prototype, "email", void 0);
//# sourceMappingURL=clienteUpdateDto.js.map