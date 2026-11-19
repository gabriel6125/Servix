var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class OrcamentoUpdateDto {
}
__decorate([
    IsOptional(),
    IsNumber()
], OrcamentoUpdateDto.prototype, "servico_id", void 0);
__decorate([
    IsOptional(),
    IsNumber()
], OrcamentoUpdateDto.prototype, "valor_pecas", void 0);
__decorate([
    IsOptional(),
    IsNumber()
], OrcamentoUpdateDto.prototype, "valor_mao_de_obra", void 0);
__decorate([
    IsOptional(),
    IsNumber()
], OrcamentoUpdateDto.prototype, "outros_custos", void 0);
__decorate([
    IsOptional(),
    IsNumber()
], OrcamentoUpdateDto.prototype, "valor_total", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50)
], OrcamentoUpdateDto.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500)
], OrcamentoUpdateDto.prototype, "link_acesso", void 0);
//# sourceMappingURL=orcamentoUpdateDto.js.map