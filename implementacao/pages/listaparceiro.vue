<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <div class="row">
          <div class="col-1">
            <img src="money.png" alt="Puccoin Logo" width="100%">
          </div>
          <div class="col-8">
            <h3 class="d-block text-center">
              Lista de Parceiros
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p,pidx) in parceiros" :key="pidx">
                  <td>{{ p.nome }}</td>
                </tr>
                <tr v-if="loading">
                  <td>Carregando...</td>
                </tr>
              </tbody>
            </table>
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
      parceiros: [],
      loading: false
    }
  },
  mounted(){
    this.loading = true
    this.$axios
      .get('/parceiro')
      .then(res => {
        this.parceiros = res.data.dados
      })
      .catch(err => {
        console.log(err.response)
        Swal.fire({
          title: 'Usuário ou Senha inválidos',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })
      .finally(()=> {
        this.loading = false
      })
  }
}
</script>

<style>

</style>