<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-4 offset-md-4 login">
        <div class="row">
          <div class="col-4">
            <img src="money.png" alt="Puccoin Logo" width="100%">
          </div>
          <div class="col-8">
            <h1 class="login-title">
              PucCoins
            </h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <form>
              <fieldset>
                <label for="userField">Usuário</label>
                <input v-model="formData.usuario" type="text" id="userField">
                <label for="passField">Senha</label>
                <input v-model="formData.senha" type="password" id="passField">
                
                <button class="button-primary d-block w-100" type="button" @click="submit">
                  Entrar
                </button>
                <router-link to="listaparceiro" class="login-cadastro">
                  Ver Parceiros
                </router-link>
                <span class="d-block float-right">
                  <span class="login-cadastro" @click="cadastrarAtivo = !cadastrarAtivo">
                    Não tenho cadastro
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0 0 36.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" fill="currentColor"/></svg>
                  </span>
                  <ul v-if="cadastrarAtivo" class="login-cadastro-lista" >
                    <li @click="$router.push('/cadastroaluno')">- Sou Aluno</li>
                    <li @click="$router.push('/cadastroparceiro')">- Sou Parceiro</li>
                    <li @click="$router.push('/cadastroprofessor')">- Sou Professor</li>
                  </ul>
                </span>
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
      },
      cadastrarAtivo: false
    }
  },
  methods: {
    submit(){
      this.$axios
        .post('/signin', this.formData)
        .then(res => {
          console.log(res.data)
          localStorage.setItem('ccuid', res.data.usuario_id)

          const tipo = res.data.tipoUsuario
          if(tipo == 'A')
            this.$router.push('dashboardaluno')
          else if(tipo == 'P') {
            this.$router.push('dashboardprofessor')
          }
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Usuário ou Senha inválidos',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
    }
  }
}
</script>

<style>
  @media only screen and (min-height: 600px) {
    .login{
      margin-top: 20%;
      transform: translateY(-50%);
    }
  }
  .login-title{
    font-family: 'Oswald', sans-serif;
    margin: 30px 20px;
  }
  .login-cadastro, .login-cadastro-lista li{
    cursor: pointer;
    color: rgb(0, 123, 194);
  }
  .login-cadastro-lista{
    padding: 0;
    list-style: none;
  }
</style>