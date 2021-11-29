<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-4 offset-md-4 login">
        <div class="row">
          <div class="col-4">
            <img src="money.png" alt="Puccoin Logo" width="100%">
          </div>
          <div class="col-8">
            <h3 class="page-title">
              Cadastro de Aluno
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <form @submit="submit">
              <fieldset>
                <label for="userField">Usuário</label>
                <input v-model="formData.usuario" required maxlength="100" type="text" id="userField">
                <label for="passField">Senha</label>
                <input v-model="formData.senha" required minlength="8" maxlength="64" type="password" id="passField">
                <label for="nameField">Nome</label>
                <input v-model="formData.nome" required maxlength="120" type="text" id="nameField">
                <label for="mailField">E-Mail</label>
                <input v-model="formData.email" required maxlength="120"  type="email" id="mailField">
                <label for="rgField">RG</label>
                <input v-model="formData.rg" required maxlength="120"  type="text" id="rgField">
                <label for="enderecoField">Endereço</label>
                <input v-model="formData.endereco" required maxlength="120"  type="text" id="enderecoField">
                <label for="cpfField">CPF</label>
                <input v-model="formData.cpf" required maxlength="120"  type="text" id="cpfField">
                
                <button class="button-primary d-block w-100" type="submit">
                  Cadastrar
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Swal = require('sweetalert2')
export default {
  data(){
    return {
      formData: {
        usuario: null,
        senha: null,
        nome: null,
        email: null,
        rg: null,
        cpf: null,
      }
    }
  },
  methods: {
    submit(ev){
      ev.preventDefault()
      this.$axios
        .post('/aluno', this.formData)
        .then(res => {
          Swal.fire({
            title: 'Sucesso no cadastro',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.$router.push('/login')
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
.page-title{
  margin: 30px 20px;
}
</style>