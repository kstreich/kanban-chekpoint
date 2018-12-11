<template>
  <div v-if="" class="tasks">
    <p>This is where we pull our tasks</p>
    {{tasks}}
    <form @submit="createTask">
      <label for="desc"> Task description </label>
      <input name="desc" type="text" v-model="taskConfig.description">
      <button type="submit">Add</button>
    </form>

  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    mounted() {
      return this.$store.dispatch('getTasks', this.listId)
    },

    data() {
      return {
        taskConfig: {
          description: '',
        }
      }
    },
    computed: {
      listId() {
        return this.$store.state.lists[0]._id
      },
      tasks() {
        return this.$store.state.tasks
      },
      boardId() {
        return this.$store.state.lists[0].boardId
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.listConfig)
      },
      createTask() {

        this.$store.dispatch('createTask', { description: this.taskConfig.description, listId: this.listId, boardId: this.boardId })
      }
    },

  }

</script>

<style scoped>


</style>