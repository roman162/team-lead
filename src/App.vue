<template>
  <div id="app">
    <nav class="navbar is-primary">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              v-if="route !== '/'"
              class="button is-light"
              to="/"
            >На главную</router-link>
            <router-link
              v-if="role === 'writer' && route !== '/editpost'"
              class="button is-light"
              to="/editpost"
            >Добавить пост</router-link>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div
            v-if="route !== '/login'"
            class="buttons"
          >
            <router-link
              class="button is-light"
              v-if="!this.currentUser"
              to="/login"
            >
              Login
            </router-link>
            <span
              v-else
              class="button is-light"
              @click="logout"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.GET_CURRENT_USER
    },
    role () {
      if (this.currentUser) {
        return this.currentUser.role
      } else {
        return null
      }
    },
    route () {
      return this.$route.path
    }
  },
  methods: {
    logout () {
      this.$store.commit('SET_CURRENT_USER', null)
    }
  }
}
</script>


<style>
</style>
