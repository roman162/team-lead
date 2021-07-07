<template>
  <section class="box container is-max-desktop">
    <b-field label="Название">
      <b-input v-model="post.title" minlength="5"></b-input>
    </b-field>
    <b-field label="Текст">
      <b-input v-model="post.description" minlength="10" type="textarea"></b-input>
    </b-field>
    <div class="buttons">
      <button
        class="button is-primary"
        @click="savePost"
      >Сохранить</button>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      post: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.GET_CURRENT_USER
    }
  },
  created () {
    this.post = this.$store.getters.GET_CURRENT_POST
    if (!this.post) {
      this.post = {
        title: '',
        description: '',
        claps: 0,
        createdAt: '',
        updateAt: '',
        userId: ''
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('SET_CURRENT_POST', null)
  },
  methods: {
    savePost () {
      if (this.post.id) {
        this.post.updateAt = new Date()
        this.$store.dispatch('EDIT_POST', this.post)
      } else {
        this.post.createdAt = new Date()
        this.post.updateAt = new Date()
        this.post.userId = this.currentUser.id
        this.$store.dispatch('ADD_POST', this.post)
      }
    }
  }
}
</script>

<style>

</style>