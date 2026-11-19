var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
// Define o comportamento e os dados desta classe.
export class PlanoCreateDto {
}
__decorate([
    IsString(),
    IsNotEmpty(),
    MaxLength(100)
], PlanoCreateDto.prototype, "nome", void 0);
__decorate([
    IsNumber(),
    IsNotEmpty()
], PlanoCreateDto.prototype, "valor", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    MaxLength(50)
], PlanoCreateDto.prototype, "periodicidade", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    IsString({ each: true })
], PlanoCreateDto.prototype, "funcionalidades", void 0);
//# sourceMappingURL=planoCreateDto.js.map