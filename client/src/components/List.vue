<template>
  <div v-if="" class="tasks">
    <p>This is where we pull our tasks</p>
    <form @submit.prevent="createTask">
      <label for="desc"> Task description </label>
      <input name="desc" type="text" v-model="taskConfig.description">
      <button type="submit">Add</button>
    </form>
    {{tasks}}
    <task v-for="task in tasks" :taskData="task"></task>

  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    mounted() {

      return this.$store.dispatch('getTasks', this.listData._id)
    },
    props: [
      "listData"
    ],
    data() {
      return {
        taskConfig: {
          description: '',
        }
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      },
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.listConfig)
      },
      createTask() {

        this.$store.dispatch('createTask', { description: this.taskConfig.description, listId: this.listData._id, boardId: this.listData.boardId })
      }
    },
    components: {
      Task
    }

  }

</script>

<style scoped>


</style>