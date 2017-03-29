<template lang="pug">
#todos
  todo-list(v-model='this.list')
  add-todo-button
  md-snackbar(md-position='bottom right', md-duration='1000', ref='notice')
    span {{ notifyMessage }}
</template>

<script>
import TodoList from './../components/TodoList.vue'
import AddTodoButton from './../components/AddTodoButton.vue'

export default {
  data() {
    return {
      notifyMessage: '',
    }
  },
  computed: {
    list() {
      return this.$store.getters[this.$route.params.filterType]
    },
  },
  mounted() {
    this.$store.dispatch('updateList', {})
      .catch(({ message }) => {
        this.notifyMessage = message
        this.$refs.notice.open()
      })
  },
  components: {
    TodoList,
    AddTodoButton,
  },
}
</script>
