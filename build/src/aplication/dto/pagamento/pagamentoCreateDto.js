var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsDateString, IsNumber } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class PagamentoCreateDto {
}
__decorate([
    IsNumber()
], PagamentoCreateDto.prototype, "servico_id", void 0);
__decorate([
    IsNumber()
], PagamentoCreateDto.prototype, "valor", void 0);
__decorate([
    IsDateString()
], PagamentoCreateDto.prototype, "data_pagamento", void 0);
//# sourceMappingURL=pagamentoCreateDto.js.map