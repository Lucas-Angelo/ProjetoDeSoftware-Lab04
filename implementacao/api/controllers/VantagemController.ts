import Vantagem, { IAtributosVantagem } from "../models/Vantagem";

import * as yup from 'yup'
import { CreateRequestHandler, DeleteRequestHandler, EnviarMPARequestHandler, GetAllRequestHandler, GetRequestHandler, UpddateRequestHandler } from "../types/RequestHandlers";
import Usuario from "../models/Usuario";
import Aluno from "../models/Aluno";
import AppError from "../errors/AppError";
import Transacao from "../models/Transacao";
import Parceiro from "../models/Parceiro";

class VantagemController {

  public comprar: EnviarMPARequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      aluno_id: yup
        .number()
        .required("'aluno_id' obrigatório!")
    });

    // Validando com o esquema criado:
    try {
      await scheme.validate(request.body, { abortEarly: false }); // AbortEarly para fazer todas as validações
    } catch (erro: any) {
      return response.status(422).json({
        enviada: false,
        nome: erro.name, // => 'ValidationError'
        erros: erro.errors
      });
    }

    const { aluno_id } = request.body;
    const vantagem_id = Number(request.params.id);

    const aluno = await Aluno.findOne({
      where: {
        id: Number(aluno_id)
      },
      include: [
        {
          model: Usuario, as: "usuario"
        }
      ],
      paranoid: false
    });
    if (!aluno) {
      throw new AppError("Aluno não encontrado!");
    }

    const vantagem = await Vantagem.findOne({
      where: {
        id: vantagem_id
      },
      include: [
        {
          model: Parceiro, as: "parceiro"
        }
      ],
      paranoid: false
    });
    if (!vantagem) {
      throw new AppError("Vantagem não encontrada!");
    }
    if((vantagem.get().valor)>aluno.get().saldo)
      throw new AppError("Saldo insuficiente!");

    const transacao = Transacao.build({
      aluno_id: aluno.get().id,
      valor: vantagem.get().valor,
      tipo: "AV",
    });

    await transacao
      .save()
      .then(async (transacao_criada) => {
        await aluno.update({
          saldo: aluno.get().saldo-vantagem.get().valor,
        })
        return response.status(201).json({
          enviada: true,
          id: transacao_criada.id,
        });
      })
      .catch((erro) => {
        throw new AppError("Transacao não criada!" + erro);
      });
  }

  public create: CreateRequestHandler = async (request, response) => {
    const scheme = yup.object().shape({
      parceiro_id: yup
        .string()
        .required("'parceiro_id' obrigatório!").max(100, "'parceiro_id' deve ter no máximo 100 caracteres!"),
      descricao: yup
        .string()
        .required("'descricao' obrigatória!")
        .min(2, "'descricao' deve ter no mínimo 2 caracteres!")
        .max(120, "'descricao' deve ter no máximo 120 caracteres!"),
      foto: yup
        .string()
        .url("'foto' deve ser uma url válida!")
        .required("'foto' obrigatória!")
        .min(2, "'foto' deve ter no mínimo 2 caracteres!")
        .max(120, "'foto' deve ter no máximo 120 caracteres!"),
      valor: yup
        .number()
        .required("'valor' obrigatória!")
        .positive("'valor' deve ser positivo!")
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

    const { parceiro_id, descricao, foto, valor } = request.body;

    const vantagem = Vantagem.build({
      parceiro_id,
      descricao,
      foto,
      valor
    });

    await vantagem
      .save()
      .then(() => {
        return response.status(201).json({
          criado: true,
          id: vantagem.id
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
    const vantagem = await Vantagem.findOne({
      where: {
        id: request.params.id
      }
    });
    if (!vantagem) {
      return response.status(404).json({
        deletado: false,
        errors: "Id de vantagem não encontrado!"
      });
    }

    await Vantagem.destroy({
      where: {
        id: request.params.id
      },
      individualHooks: true
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
      descricao: yup
        .string()
        .required("'descricao' obrigatória!")
        .min(2, "'descricao' deve ter no mínimo 2 caracteres!")
        .max(120, "'descricao' deve ter no máximo 120 caracteres!"),
      foto: yup
        .string()
        .url("'foto' deve ser uma url válida!")
        .required("'foto' obrigatória!")
        .min(2, "'foto' deve ter no mínimo 2 caracteres!")
        .max(120, "'foto' deve ter no máximo 120 caracteres!"),
      valor: yup
        .number()
        .required("'valor' obrigatória!")
        .positive("'valor' deve ser positivo!")
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

    const { parceiro_id, descricao, foto, valor } = request.body;

    const vantagem = await Vantagem.findOne({
      where: {
        id: request.params.id
      },
    });
    if (!vantagem) {
      return response.status(404).json({
        atualizado: false,
        nome: "Vantagem não encontrado",
        erros: "O id que foi solicitado alteração não existe no banco de dados"
      });
    } else {
      await vantagem.update({
        parceiro_id,
        descricao,
        foto,
        valor
      });

      return response.status(200).json({
        atualizado: true,
        id: vantagem.id
      });
    }
  }

  public get: GetRequestHandler<IAtributosVantagem> = async (request, response) => {

    const vantagem = await Vantagem.findOne({
      where: {
        id: request.params.id
      },
      include: [
        {
          model: Parceiro, as: "parceiro",
          include: [
            {
              model: Usuario, as: "usuario",
            }
          ]
        }
      ],
      paranoid: false
    });
    if (!vantagem) {
      return response.status(404).json(vantagem);
    } else {
      return response.status(200).json(vantagem);
    }
  }

  public getAll: GetAllRequestHandler<IAtributosVantagem> = async (request, response) => {

    await Vantagem.findAndCountAll({
      paranoid: false,
      include: [
        {
          model: Parceiro, as: "parceiro",
          include: [
            {
              model: Usuario, as: "usuario",
            }
          ]
        }
      ],
    })
      .then(vantagens => {
        return response.status(200).json({
          dados: vantagens.rows,
          quantidade: vantagens.rows.length,
          total: vantagens.count
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

export default VantagemController;
