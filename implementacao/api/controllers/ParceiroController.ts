import Parceiro, { IAtributosParceiro } from "../models/Parceiro";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import Usuario from "../models/Usuario";

class ParceiroController {

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      usuario: yup
        .string()
        .required("'usuario' obrigatório!").max(100, "'usuario' deve ter no máximo 100 caracteres!"),
      senha: yup
        .string()
        .required("'senha' obrigatória!")
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),
      nome: yup
        .string()
        .required("'nome' obrigatória!")
        .min(2, "'nome' deve ter no mínimo 2 caracteres!")
        .max(120, "'nome' deve ter no máximo 120 caracteres!")
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro: any) {
      return response.status(422).json({
        criado: false,
        nome: erro.name, // => 'ValidationError'
        erros: erro.errors
      });
    }

    const { usuario, senha, nome } = request.body;


    const user = Usuario.build({
      usuario,
      senha,
      tipo: "E"
    });

    await user
      .save()
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });

    const parceiro = Parceiro.build({
      usuario_id: user.id,
      nome
    });

    await parceiro
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: parceiro.id
        });
      })
      .catch((erro) => {
        return response.status(500).json({
          criado: false,
          erros: erro.message
        });
      });
  }

  public delete: DeleteRequestHandler = async (request, response) => {
    const parceiro = await Parceiro.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!parceiro) {
      return response.status(404).json({
        deletado: false,
        errors: "Id de parceiro não encontrado!"
      });
    }

    await Parceiro.destroy({
      where: {
        id: request.params.id
      }
    })
      .then(dado => {
        return response.status(204).json({
          deletado: true,
          dado
        });
      })
      .catch(function (error) {
        return response.status(500).json({
          deletado: false,
          errors: error
        });
      });
  }

  public update: UpddateRequestHandler = async (request, response) => {

    const scheme = yup.object().shape({
      senha: yup
        .string()
        .min(8, "'senha' deve ter no mínimo 8 caracteres!")
        .max(64, "'senha' deve ter no máximo 64 caracteres!"),
      nome: yup
        .string()
        .min(2, "'nome' deve ter no mínimo 2 caracteres!")
        .max(120, "'nome' deve ter no máximo 120 caracteres!")
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (err: any) {
      return response.status(422).json({
        atualizado: false,
        nome: err.name, // => 'ValidationError'
        erros: err.errors
      });
    }

    const { nome } = request.body;
    const { senha } = request.body;

    const parceiro = await Parceiro.findOne({
      where: {
        id: request.params.id
      },
    });
    if (!parceiro) {
      return response.status(404).json({
        atualizado: false,
        nome: "Parceiro não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await parceiro.update({
        nome
      });
      const usuario = await Usuario.findOne({
        where: {
          id: parceiro.get().usuario_id
        }
      });
      if (!usuario) {
        return response.status(404).json({
          atualizado: false,
          nome: "Usuario não encontrado",
          erros: "O id que foi solicitado alteração não existe no banco de dados"
        });
      } else {
        await usuario.update({
          senha: senha,
        });
      }

      return response.status(200).json({
        atualizado: true,
        id: parceiro.id
      });
    }
  }

  public get: GetRequestHandler<IAtributosParceiro> = async (request, response) => {

    const parceiro = await Parceiro.findOne({
      where: {
        id: request.params.id
      },
      paranoid: false
    });
    if (!parceiro) {
      return response.status(404).json(parceiro);
    } else {
      return response.status(200).json(parceiro);
    }
  }

  public getAll: GetAllRequestHandler<IAtributosParceiro> = async (request, response) => {

    await Parceiro.findAndCountAll({
      paranoid: false,
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
    })
      .then(parceiro => {
        return response.status(200).json({
          dados: parceiro.rows,
          quantidade: parceiro.rows.length,
          total: parceiro.count
        });
      })
      .catch(function (error) {
        return response.status(500).json({
          titulo: "Erro interno do servidor!",
          error
        });
      });
  }
}

export default ParceiroController;
