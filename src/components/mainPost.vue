<template>
  <div class="box">
    <h3 class="title is-4">
      {{ post.title }}
    </h3>
    <div class="content">
      {{ post.description }}
    </div>
    <div class="columns">
      <div class="column is-3">
        <time
          :datetime="post.updateAt"
        >
          {{ updateDate }}
        </time>
      </div>
      <div class="column">
        <div class="buttons is-right">
          <div
            v-if="role === 'reader'"
            class="button is-primary"
            @click="addClap"
          >
            <svg-icon type="mdi" :path="claps"></svg-icon>
            {{ post.claps }}
          </div>
          <div
            v-if="role === 'writer' && userId === post.userId"
            class="button is-primary"
            @click="editPost"
          >
            <svg-icon type="mdi" :path="edit"></svg-icon>
            Редактировать
          </div>
          <div
            v-if="role === 'writer' && userId === post.userId"
            class="button is-primary"
            @click="deletePost"
          >
            <svg-icon type="mdi" :path="del"></svg-icon>
            Удалить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHandLeft, mdiBookEdit, mdiDelete } from '@mdi/js'

export default {
  components: {
    SvgIcon
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      claps: mdiHandLeft,
      edit: mdiBookEdit,
      del: mdiDelete
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
    userId () {
      if (this.currentUser) {
        return this.currentUser.id
      } else {
        return null
      }
    },
    updateDate () {
      return new Date(this.post.updateAt).toDateString()
    }
  },
  methods: {
    addClap () {
      this.$store.dispatch('SET_CLAP_TO_SERVER', this.post.id)
    },
    deletePost () {
      this.$store.dispatch('DELETE_POST_TO_SERVER', this.post.id)
    },
    editPost () {
      this.$store.commit('SET_CURRENT_POST', this.post)
      this.$router.push('/editpost')
    }
  }
}
</script>

<style>

</style>