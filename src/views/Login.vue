<template>
  <section class="container is-max-desktop">
    <form class="box">
      <b-field
        label="Логин"
        :type="invalidLogin ? 'is-danger' : ''"
        :message="invalidLogin ? 'Неверный Email' : ''"
      >
        <b-input
          type="email"
          placeholder="Введите e-mail"
          v-model="mail">
        </b-input>
      </b-field>
      <b-field
        label="Пароль"
        :type="invalidPassword ? 'is-danger' : ''"
        :message="invalidPassword ? 'Неверный Пароль' : ''"
      >
        <b-input
          type="password"
          placeholder="Введите пароль"
          v-model="password"
          minlength="6">
        </b-input>
      </b-field>
      <button
        class="button is-primary"
        type="submit"
        @click.prevent="authenticate()"
      >
        Login
      </button>
    </form>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      mail: '',
      password: '',
      user: null,
      invalidLogin: false,
      invalidPassword: false
    }
  },
  methods: {
    async authenticate () {
      this.invalidLogin = false
      this.invalidPassword = false
      let user
      axios.get(`http://localhost:3000/users?login=${this.mail}`)
        .then((response) => {
          user = response.data[0]
          if (user.password.toString() === this.password.toString()) {
            this.user = user
            this.$store.commit('SET_CURRENT_USER', user)
            this.$router.push("/")
          } else {
            this.invalidPassword = true
          }
        })
        .catch(() => {
          this.invalidLogin = true
        })
    },
  }
}
</script>

<style>

</style>