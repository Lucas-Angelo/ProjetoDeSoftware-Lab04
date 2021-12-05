<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
        <img src="money.png" alt="Puccoin Logo" width="50px" />
      </div>
      <div class="col-9">
        <h4>Parceiro: {{ parceiro.nome }} -</h4>
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
          Suas Vantagens
          <button
            class="button button-outline float-right"
            @click="modalEnviar = true;reloadFormVantagem()"
          >
            Cadastrar Vantagem
          </button>
        </h4>
        <table>
          <thead>
            <tr>
              <th width="50px">Foto</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th width="30px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, tidx) in parceiro.vantagens" :key="tidx">
              <td>
                <img
                  :src="v.foto"
                  :alt="`${v.descricao} - Foto`"
                  height="50px"
                  width="100%"
                />
              </td>
              <td>{{ v.descricao }}</td>
              <td>{{ v.valor }}</td>
              <td>
                <button class="button button-outline" @click="editarVantagem(v)">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="20px"
                    height="20px"
                    viewBox="0 0 494.936 494.936"
                    style="enable-background: new 0 0 494.936 494.936"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
        c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
        s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
        c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                        />
                        <path
                          d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
        c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
        c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
        C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
        l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
        c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
              </td>
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
        <form @submit="submitVantagem">
          <fieldset>
            <label for="valorField">Descrição</label>
            <input v-model="formVantagem.descricao" required type="text" />
            <label for="valorField">Valor</label>
            <input
              v-model="formVantagem.valor"
              min="0"
              required
              type="number"
            />
            <label for="valorField">URL da Foto</label>
            <input v-model="formVantagem.foto" required type="text" />
            <br />
            <button class="button-primary d-block w-100" type="submit">
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
      parceiro: {},
      formData: {
        senha: null,
        nome: null,
      },
      formVantagem: {
        foto: null,
        valor: null,
        descricao: null,
      },
      formEdit: false,
      loading: false,
      modalEnviar: false,
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    submit(ev) {
      ev.preventDefault();
      this.$axios
        .put("/parceiro/" + this.parceiro.id, this.formData)
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
        .get(`/parceiro/${id}`)
        .then((res) => {
          this.parceiro = res.data;
          this.formData.nome = this.parceiro.nome;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fecharModal(ev) {
      if (ev.target.className == "modal-enviomoedas") this.modalEnviar = false;
    },
    submitVantagem(ev) {
      ev.preventDefault();
      let id = localStorage.getItem("ccuid");
      const obj = {
        parceiro_id: id,
        descricao: this.formVantagem.descricao,
        valor: this.formVantagem.valor,
        foto: this.formVantagem.foto,
      };
      if(!this.formVantagem.id) {
        this.$axios
          .post(`/vantagem`, obj)
          .then((res) => {
            Swal.fire({
              title: "Vantagem Cadastrada",
              icon: "success",
              confirmButtonText: "OK",
            });
            this.modalEnviar = false;
            this.reloadFormVantagem()
            this.reload();
          })
          .catch((err) => {
            console.log(err.response.data);
            Swal.fire({
              title: err.response.data.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      } else {
        this.$axios
          .put(`/vantagem/${this.formVantagem.id}`, obj)
          .then((res) => {
            Swal.fire({
              title: "Vantagem Salva",
              icon: "success",
              confirmButtonText: "OK",
            });
            this.modalEnviar = false;
            this.reloadFormVantagem()
            this.reload();
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
    reloadFormVantagem(){
      this.formVantagem = {
        foto: null,
        valor: null,
        descricao: null,
      };
    },
    editarVantagem(vantagem) {
      this.formVantagem = vantagem
      this.modalEnviar = true
    }
  },
};
</script>

<style>
.dash-prof-transacao {
  border-right: 1px solid rgb(187, 187, 187);
}
.modal-enviomoedas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.308);
  z-index: 10;
}
.modal-enviomoedas-container {
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