<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-4 offset-md-4 login">
        <div class="row">
          <div class="col-4">
            <img src="money.png" alt="Puccoin Logo" width="100%">
          </div>
          <div class="col-8">
            <h4 class="page-title">
              Cadastro de Parceiro
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <form @submit="submit">
              <fieldset>
                <label for="nameField">Nome</label>
                <input v-model="formData.nome" required maxlength="120" type="text" id="nameField">
                
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
        nome: null
      }
    }
  },
  methods: {
    submit(ev){
      ev.preventDefault()
      this.$axios
        .post('/parceiro', this.formData)
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