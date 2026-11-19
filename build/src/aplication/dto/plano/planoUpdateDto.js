var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class PlanoUpdateDto {
}
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MaxLength(100)
], PlanoUpdateDto.prototype, "nome", void 0);
__decorate([
    IsOptional(),
    IsNumber()
], PlanoUpdateDto.prototype, "valor", void 0);
__decorate([
    IsOptional(),
    IsString(),
    IsNotEmpty(),
    MaxLength(50)
], PlanoUpdateDto.prototype, "periodicidade", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true })
], PlanoUpdateDto.prototype, "funcionalidades", void 0);
//# sourceMappingURL=planoUpdateDto.js.map