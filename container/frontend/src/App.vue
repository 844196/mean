<template lang="pug">
#app
  md-whiteframe(md-tag='md-toolbar', md-elevation='2')
    md-button.md-icon-button(@click.native='toggleLeftSidenav')
      md-icon menu
    h2.md-title Todo
  md-sidenav.md-left(ref='leftSidenav')
    md-list
      md-list-item
        router-link(to='/todos/incomplete')
          md-icon inbox
          span Inbox
      md-list-item
        router-link(to='/todos/complete')
          md-icon done
          span Done
      md-list-item
        router-link(to='/todos/all')
          md-icon view_list
          span All
  main
    router-view
</template>

<script>
export default {
  name: 'app',
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle()
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
