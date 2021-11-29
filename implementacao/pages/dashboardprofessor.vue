<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
        <img src="money.png" alt="Puccoin Logo" width="50px" />
      </div>
      <div class="col-9">
        <h4>
          Professor: {{ professor.nome }} -
          <small> Saldo: {{ professor.saldo }} </small>
        </h4>
      </div>
      <div class="col-2">
        <router-link to="/login">
          <svg
            class="float-right"
            style="width: 20px"
            enable-background="new 0 0 384.971 384.971"
            version="1.1"
            viewBox="0 0 384.97 384.97"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m180.46 360.91h-156.39v-336.85h156.39c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03h-168.42c-6.64 0-12.03 5.389-12.03 12.03v360.91c0 6.641 5.39 12.03 12.03 12.03h168.42c6.641 0 12.03-5.39 12.03-12.03 1e-3 -6.641-5.389-12.03-12.029-12.03z"
            />
            <path
              d="m381.48 184.09-83.009-84.2c-4.704-4.752-12.319-4.74-17.011 0-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46h-247.74c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179 4.704 4.752 12.319 4.752 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512 0.012-17.18z"
            />
          </svg>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 dash-prof-transacao">
        <h4>
          Minhas Transações
          <button class="button button-outline float-right" @click="modalEnviar = true">Enviar Moedas</button>
        </h4>
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t, tidx) in professor.transacoesp" :key="tidx">
              <td>{{ t.transacao.valor }}</td>
              <td>{{ t.mensagem }}</td>
            </tr>
            <tr v-if="loading">
              <td>Carregando...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-md-4">
        <h4>
          Meus Dados
          <small
            v-if="!formEdit"
            class="float-right cursor-pointer"
            style="font-size: 1.3rem"
            @click="formEdit = true"
            >Editar</small
          >
        </h4>
        <form @submit="submit">
          <fieldset>
            <label for="userField">Usuário</label>
            <span v-if="!formEdit">{{ formData.usuario }}</span>
            <input
              v-else
              v-model="formData.usuario"
              required
              maxlength="100"
              type="text"
              id="userField"
            />

            <label v-if="formEdit" for="passField">Senha</label>
            <input
              v-if="formEdit"
              v-model="formData.senha"
              required
              minlength="8"
              maxlength="64"
              type="password"
              id="passField"
            />

            <label for="nameField">Nome</label>
            <span v-if="!formEdit">{{ formData.nome }}</span>
            <input
              v-else
              v-model="formData.nome"
              required
              maxlength="120"
              type="text"
              id="nameField"
            />

            <label for="departField">Departamento</label>
            <span v-if="!formEdit">{{ formData.departamento }}</span>
            <input
              v-else
              v-model="formData.departamento"
              required
              maxlength="120"
              type="text"
              id="departField"
            />

            <label for="cpfField">CPF</label>
            <span v-if="!formEdit">{{ formData.cpf }}</span>
            <input
              v-else
              v-model="formData.cpf"
              required
              maxlength="120"
              type="text"
              id="cpfField"
            />
            <br />
            <button
              v-if="formEdit"
              class="button-primary d-block w-100"
              type="submit"
            >
              Salvar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
    <div v-if="modalEnviar" class="modal-enviomoedas" @click="fecharModal">
      <div class="modal-enviomoedas-container">
        <form @submit="submitMoeda">
          <fieldset>
            <label for="alunosField">Aluno</label>
            <select v-model="formMoeda.aluno_id" required id="alunosField">
              <option disabled selected>Selecione um Aluno</option>
              <option v-for="(a,idx) in alunos" :key="idx" :value="a.id">
                {{ a.nome }}
              </option>
            </select>
            <label for="valorField">Valor</label>
            <input v-model="formMoeda.valor" required type="number">
            <label for="msgField">Mensagem</label>
            <textarea v-model="formMoeda.mensagem" minlength="2" required id="msgField" type="text" />
            <br />
            <button
              class="button-primary d-block w-100"
              type="submit"
            >
              Enviar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Swal = require("sweetalert2");
export default {
  data() {
    return {
      professor: {},
      formData: {
        usuario: null,
        senha: null,
        nome: null,
        departamento: null,
        cpf: null,
      },
      formMoeda: {
        aluno_id: null,
        valor: null,
        mensagem: null
      },
      formEdit: false,
      loading: false,
      modalEnviar: false,
      alunos: []
    };
  },
  mounted() {
    this.reload();
    this.$axios
      .get('/aluno')
      .then(res => {
        this.alunos = res.data.dados
      })
  },
  methods: {
    submit(ev) {
      ev.preventDefault();
      this.$axios
        .put("/professor/" + this.professor.id, this.formData)
        .then((res) => {
          Swal.fire({
            title: "Dados Atualizados",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.formEdit = false;
          this.formData.senha = null;
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Erro na atualização",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    },
    reload() {
      let id = localStorage.getItem("ccuid");
      this.loading = true;
      this.$axios
        .get(`/professor/${id}`)
        .then((res) => {
          this.professor = res.data;
          this.formData.usuario = this.professor.usuario.usuario;
          this.formData.nome = this.professor.nome;
          this.formData.cpf = this.professor.cpf;
          this.formData.departamento = this.professor.departamento;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fecharModal(ev){
      if(ev.target.className == 'modal-enviomoedas')
        this.modalEnviar = false
    },
    submitMoeda(ev){
      ev.preventDefault()
      let id = localStorage.getItem("ccuid");
      const obj = {
        professor_id: id,
        mensagem: this.formMoeda.mensagem,
        valor: this.formMoeda.valor
      }
      this.$axios
        .post(`/professor/${this.formMoeda.aluno_id}`, obj)
        .then(res => {
          Swal.fire({
            title: "Transferência Realizada",
            icon: "success",
            confirmButtonText: "OK",
          });
          this.modalEnviar = false
          this.formMoeda = {
            aluno_id: null,
            valor: null,
            mensagem: null
          }
          this.reload()
        })
        .catch((err) => {
          console.log(err.response.data);
          Swal.fire({
            title: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });

    }
  },
};
</script>

<style>
.dash-prof-transacao {
  border-right: 1px solid rgb(187, 187, 187);
}
.modal-enviomoedas{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.308);
  z-index: 10;
}
.modal-enviomoedas-container{
  background: #fff;
  position: fixed;
  top: 50px;
  left: 25%;
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  z-index: 11;
}
</style>