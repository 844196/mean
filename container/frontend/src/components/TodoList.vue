<template lang="pug">
.todo-list
  md-table
    md-table-header
      md-table-row
        md-table-head.md-table-selection
        md-table-head Name
        md-table-head Actions
    md-table-body
      md-table-row(v-for='(todo, idx) in value', :key='todo.id')
        md-table-cell.md-table-selection
          md-checkbox(v-model='todo.isDone', @change.self='toggleTodoStatus(todo.id, !todo.isDone)')
        md-table-cell {{ todo.name }}
        md-table-cell
          .todo-actions
            md-button.md-icon-button(@click.native='openDialog(todo.id, todo.name)')
              md-icon edit
            md-button.md-icon-button(@click.native='deleteTodo(todo.id)')
              md-icon delete
  md-snackbar(md-position='bottom right', md-duration='1000', ref='notice')
    span {{ notifyMessage }}
  md-dialog-prompt(v-model='dialog.value', md-title='Edit Todo', @close='closeDialog', ref='dialog')
</template>

<script>
export default {
  name: 'todo-list',
  props: {
    value: Array,
  },
  data() {
    return {
      notifyMessage: '',
      dialog: {
        targetId: '',
        title: '',
        value: '',
      },
    }
  },
  methods: {
    action(type, payload, callback) {
      this.$store.dispatch(type, payload)
        .then(callback)
        .catch(({ message }) => this.notify(message))
    },
    renameTodo(id, name) {
      this.action('updateTodo', {id, patch: {name}}, (result) => {
        this.notify('Renamed todo!')
      })
    },
    toggleTodoStatus(id, isDone) {
      this.action('updateTodo', {id, patch: {isDone}}, (result) => {
        this.notify('Updated todo status!')
      })
    },
    deleteTodo(id) {
      this.action('deleteTodo', {id}, (result) => {
        this.notify('Deleted todo!')
      })
    },
    notify(message) {
      this.notifyMessage = message
      this.$refs.notice.open()
    },
    openDialog(targetId, value) {
      this.dialog = {targetId, value}
      this.$refs['dialog'].open()
    },
    closeDialog(context) {
      if (context === 'cancel') return
      this.renameTodo(this.dialog.targetId, this.dialog.value)
    },
  },
}
</script>

<style lang="stylus" scoped>
.todo-actions
  justify-content: inherit
  .md-icon
    position: inherit
</style>
