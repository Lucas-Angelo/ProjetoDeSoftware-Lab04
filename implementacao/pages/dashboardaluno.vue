<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
        <img src="money.png" alt="Puccoin Logo" width="50px">
      </div>
      <div class="col-9">
        <h4>
          Aluno: {{ aluno.nome }} -
          <small>
            Saldo: {{ aluno.saldo }}
          </small>
        </h4>
      </div>
      <div class="col-2">
        <router-link to="/login">
          <svg class="float-right" style="width: 20px" enable-background="new 0 0 384.971 384.971" version="1.1" viewBox="0 0 384.97 384.97" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m180.46 360.91h-156.39v-336.85h156.39c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03h-168.42c-6.64 0-12.03 5.389-12.03 12.03v360.91c0 6.641 5.39 12.03 12.03 12.03h168.42c6.641 0 12.03-5.39 12.03-12.03 1e-3 -6.641-5.389-12.03-12.029-12.03z"/><path d="m381.48 184.09-83.009-84.2c-4.704-4.752-12.319-4.74-17.011 0-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46h-247.74c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179 4.704 4.752 12.319 4.752 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512 0.012-17.18z"/></svg>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 dash-aluno-transacao">
        <h4>
          Transações
        </h4>
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t,tidx) in aluno.transacoes" :key="tidx">
              <td>{{ t.valor }}</td>
              <td>{{ t.transacaop.mensagem }}</td>
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
          <small v-if="!formEdit" class="float-right cursor-pointer" style="font-size:1.3rem" @click="formEdit = true">Editar</small>
        </h4>
        <form @submit="submit">
          <fieldset>
            <label for="userField">Usuário</label>
            <span v-if="!formEdit">{{ formData.usuario }}</span>
            <input v-else v-model="formData.usuario" required maxlength="100" type="text" id="userField">

            <label v-if="formEdit" for="passField">Senha</label>
            <input v-if="formEdit" v-model="formData.senha" required minlength="8" maxlength="64" type="password" id="passField">

            <label for="nameField">Nome</label>
            <span v-if="!formEdit">{{ formData.nome }}</span>
            <input v-else v-model="formData.nome" required maxlength="120" type="text" id="nameField" >

            <label for="mailField">E-Mail</label>
            <span v-if="!formEdit">{{ formData.email }}</span>
            <input v-else v-model="formData.email" required maxlength="120"  type="email" id="mailField">

            <label for="rgField">RG</label>
            <span v-if="!formEdit">{{ formData.rg }}</span>
            <input v-else v-model="formData.rg" required maxlength="120"  type="text" id="rgField">

            <label for="enderecoField">Endereço</label>
            <span v-if="!formEdit">{{ formData.endereco }}</span>
            <input v-else v-model="formData.endereco" required maxlength="120"  type="text" id="enderecoField" >

            <label for="cpfField">CPF</label>
            <span v-if="!formEdit">{{ formData.cpf }}</span>
            <input v-else v-model="formData.cpf" required maxlength="120"  type="text" id="cpfField">
            <br>
            <button v-if="formEdit" class="button-primary d-block w-100" type="submit">
              Salvar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Swal = require('sweetalert2')
export default {
  data(){
    return {
      aluno: {},
      formData: {
        usuario: null,
        senha: null,
        nome: null,
        email: null,
        rg: null,
        cpf: null,
      },
      formEdit: false,
      loading: false
    }
  },
  mounted(){
    let id = localStorage.getItem('ccuid')
    this.$axios
      .get(`/aluno/${id}`)
      .then(res => {
        this.aluno = res.data
        this.formData.usuario = this.aluno.usuario.usuario
        this.formData.nome = this.aluno.nome
        this.formData.email = this.aluno.email
        this.formData.cpf = this.aluno.cpf
        this.formData.rg = this.aluno.rg
        this.formData.endereco = this.aluno.endereco
      })
  },
  methods: {
    submit(ev){
      ev.preventDefault()
      this.$axios
        .put('/aluno/'+this.aluno.id, this.formData)
        .then(res => {
          Swal.fire({
            title: 'Dados Atualizados',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.formEdit = false
          this.formData.senha = null
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Erro no cadastro',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    }
  }
}
</script>

<style>
.dash-aluno-transacao{
  border-right: 1px solid rgb(187, 187, 187);
}
</style>