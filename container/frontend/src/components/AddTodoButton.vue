<template lang="pug">
.add-todo-button
  md-button.md-fab.md-fab-bottom-right(@click.native='openDialog')
    md-icon add
  md-snackbar(md-position='bottom right', md-duration='1000', ref='notice')
    span {{ notifyMessage }}
  md-dialog-prompt(v-model='dialog.value', md-title='Add Todo', @close='closeDialog', ref='dialog')
</template>

<script>
export default {
  name: 'add-todo-button',
  data() {
    return {
      notifyMessage: '',
      dialog: {
        value: '',
      }
    }
  },
  methods: {
    createTodo(name) {
      this.$store.dispatch('createTodo', {name, isDone: false})
        .then((result) => {
          this.notify('Created todo!')
        })
        .catch(({ message }) => this.notify(message))
    },
    notify(message) {
      this.notifyMessage = message
      this.$refs.notice.open()
    },
    openDialog() {
      this.$refs['dialog'].open()
    },
    closeDialog(context) {
      if (context === 'cancel') return
      this.createTodo(this.dialog.value)
    },
  },
}
</script>
