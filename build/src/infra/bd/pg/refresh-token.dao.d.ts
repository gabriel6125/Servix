export declare class RefreshTokenDao {
    salvar(usuarioId: string, tokenHash: string, expiresAt: Date): Promise<void>;
    rotacionar(tokenHash: string, novoTokenHash: string, expiresAt: Date): Promise<string | null>;
    revogar(tokenHash: string): Promise<void>;
    private reverterTransacao;
}
//# sourceMappingURL=refresh-token.dao.d.ts.map