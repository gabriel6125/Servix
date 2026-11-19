var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class ServicoUpdateDto {
}
__decorate([
    IsOptional(),
    IsNumber(),
    IsInt(),
    Min(1)
], ServicoUpdateDto.prototype, "cliente_id", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty()
], ServicoUpdateDto.prototype, "descricao", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50)
], ServicoUpdateDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsDateString()
], ServicoUpdateDto.prototype, "data_prevista", void 0);
__decorate([
    IsOptional(),
    IsDateString()
], ServicoUpdateDto.prototype, "data_conclusao", void 0);
//# sourceMappingURL=servicoUpdateDto.js.map