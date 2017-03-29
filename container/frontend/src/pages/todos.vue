<template lang="pug">
#inbox
  todo-list(v-model='this.list')
  add-todo-button
</template>

<script>
import TodoList from './../components/TodoList.vue'
import AddTodoButton from './../components/AddTodoButton.vue'

export default {
  computed: {
    list() {
      return this.$store.getters[this.$route.params.filterType]
    },
  },
  mounted() {
    this.updateList()
  },
  methods: {
    updateList() {
      this.$store.dispatch('updateList', {})
        .catch(({ message }) => this.notify(message))
    },
    notify(message) {
      this.notifyMessage = message
      this.$refs.notice.open()
    },
  },
  components: {
    TodoList,
    AddTodoButton,
  },
}
</script>
