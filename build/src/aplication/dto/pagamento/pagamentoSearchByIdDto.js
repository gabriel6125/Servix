var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsString, Matches } from 'class-validator';
import { PagamentoSearchDto } from './pagamentoSearchDto';
// Define o comportamento e os dados desta classe.
export class PagamentoSearchByIdDto extends PagamentoSearchDto {
}
__decorate([
    IsString(),
    Matches(/^[1-9]\d*$/)
], PagamentoSearchByIdDto.prototype, "id", void 0);
//# sourceMappingURL=pagamentoSearchByIdDto.js.map