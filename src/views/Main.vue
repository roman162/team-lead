<template>
  <div class="home">
    <div class="columns is-mobile is-multiline is-centered">
      <div
        v-for="(post, index) of currentPosts"
        :key="index"
        class="column is-7"
      >
        <main-post
          :post="post"
        />
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <b-pagination
          :total="this.posts.length"
          v-bind:current.sync="currentPage"
          :range-before="2"
          :range-after="2"
          :order="'is-centered'"
          :size="'default'"
          :simple="false"
          :rounded="false"
          :per-page="perPage"
          :icon-prev="left"
          :icon-next="right"
          :aria-next-label="'Next page'"
          :aria-previous-label="'Previous page'"
          aria-page-label="Page"
          aria-current-label="Current page">
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import mainPost from '@/components/mainPost.vue'

export default {
  name: 'Home',
  components: {
    mainPost
  },
  data () {
    return {
      currentPage: 1,
      perPage: 10,
      left: 'chevron-left',
      right: 'chevron-right'
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.GET_CURRENT_USER
    },
    posts () {
      return this.$store.getters.GET_ALL_POSTS
    },
    currentPosts () {
      const index = (this.currentPage - 1) * this.perPage
      if (this.posts) {
        const newArr = this.posts.slice(index, index + this.perPage - 1)
        return newArr
      } else {
        return null
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_ALL_POSTS')
  },
}
</script>
