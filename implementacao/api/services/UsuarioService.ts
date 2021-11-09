import AppError from "../errors/AppError";
import Usuario, { IAtributosUsuario, IAtributosUsuarioCriacao } from "../models/Usuario";

export default class UsuarioService {

  async create(usuario: IAtributosUsuarioCriacao) {
    return Usuario.create(usuario);
  }

  async update(usuario: Partial<IAtributosUsuario>) {
    return Usuario.update(usuario, {
      where: { id: usuario.id }
    });
  }

  async delete(id: number) {
    const usuario = await this.getById(id);
    if (!usuario) {
      throw new AppError("Usuário não encontrado!", 404);
    }
    return Usuario.destroy({
      where: { id }
    })
  }

  async getById(id: number) {
    return Usuario.findOne({
      where: { id }
    })
  }

  async getBy(field: keyof Usuario, value: any) {
    return Usuario.findOne({
      where: {
        [field]: value
      }
    })
  }

  async getAll(atributos: string[],) {
    return Usuario.findAndCountAll()
      .then(async (dados) => {
        return {
          usuarios: await Usuario.findAll({
            attributes: atributos
          }),
          count: dados.count
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

}
