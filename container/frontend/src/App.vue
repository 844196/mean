<template lang="pug">
#app
  md-whiteframe(md-tag='md-toolbar', md-elevation='2')
    h2.md-title Todo
  main
    md-table
      md-table-header
        md-table-row
          md-table-head.md-table-selection
          md-table-head Name
          md-table-head Actions
      md-table-body
        md-table-row(v-for='(todo, idx) in this.list', :key='todo.id')
          md-table-cell.md-table-selection
            md-checkbox(v-model='todo.isDone', @change.self='toggleTodoStatus(todo.id, !todo.isDone)')
          md-table-cell {{ todo.name }}
          md-table-cell
            .todo-actions
              md-button.md-icon-button(@click.native='openDialog("Edit todo", todo.id, todo.name)')
                md-icon edit
              md-button.md-icon-button(@click.native='deleteTodo(todo.id)')
                md-icon delete
    md-button.md-fab.md-fab-bottom-right(@click.native='openDialog("Add todo", "", "")')
      md-icon add
    md-snackbar(md-position='bottom right', md-duration='1000', ref='notice')
      span {{ notifyMessage }}
    md-dialog-prompt(v-model='dialog.value', :md-title='dialog.title', @close='closeDialog', ref='upsertTodo')
</template>

<script>
export default {
  name: 'app',
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
  computed: {
    list() {
      return this.$store.state.list
    },
  },
  mounted() {
    this.updateList()
  },
  methods: {
    action(type, payload, callback) {
      this.$store.dispatch(type, payload)
        .then(callback)
        .catch(({ message }) => this.notify(message))
    },
    updateList() {
      this.action('updateList', {})
    },
    createTodo(name) {
      this.action('createTodo', {name, isDone: false}, (result) => {
        this.notify('Created todo!')
      })
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
    openDialog(title, targetId, value) {
      this.dialog = {title, targetId, value}
      this.$refs['upsertTodo'].open()
    },
    closeDialog(context) {
      if (context === 'cancel') return
      if (this.dialog.targetId) {
        this.renameTodo(this.dialog.targetId, this.dialog.value)
      } else {
        this.createTodo(this.dialog.value)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
main
  margin: 0 auto
  padding: 0 5px
  max-width: 996px
.todo-actions
  justify-content: inherit
  .md-icon
    position: inherit
</style>
