<template lang="pug">
#app
  md-whiteframe
    md-toolbar
      h1.md-title Todo
  main
    md-table
      md-table-header
        md-table-row
          md-table-head Name
          md-table-head isDone
      md-table-body
        md-table-row(v-for='(todo, idx) in this.list', :key='todo.id')
          md-table-cell {{ todo.name }}
          md-table-cell {{ todo.isDone }}
    md-snackbar(md-position='bottom right', md-duration='4000', ref='notice')
      span {{ notifyMessage }}
</template>

<script>
export default {
  name: 'app',
  data() {
    return {notifyMessage: ''}
  },
  computed: {
    list() {
      return this.$store.state.list
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('getList')
        .catch((err) => {
          this.notify(err.message)
        })
    },
    notify(message) {
      this.notifyMessage = message
      this.$refs.notice.open()
    },
  },
}
</script>

<style lang="stylus" scoped>
main
  margin: 0 auto
  padding: 0 5px
  max-width: 996px
</style>
