import { Usuario } from "../../entidades/usuario";
export type UsuarioUpdateData = {
    id: string;
    nome: string;
    email: string;
    senha: string;
};
export interface IClienteDAO {
    registrar(usuario: Usuario): Promise<void>;
    searchByemail(email: string): Promise<Usuario | null>;
    searchById(id: string): Promise<Usuario | null>;
    update(id: string, data: UsuarioUpdateData): Promise<void>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=cliente.dao.interfece.d.ts.map