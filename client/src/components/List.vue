<template>
  <div v-if="" class="tasks borderBox mb-5">
    <!-- <p>This is where we pull our tasks</p> -->
    <h3>List Name: {{listData.name}}</h3>
    <h3 class="mb-5">List Description: {{listData.description}}</h3>
    <task v-for="task in tasks" :taskData="task"></task>

    <form class="mt-5" @submit.prevent="createTask">
      <label for="desc"> Task description </label>
      <input name="desc" type="text" v-model="taskConfig.description">
      <button type="submit">Add</button>
    </form>
    <button @click="deleteList(listData._id)">Delete</button>

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
        return this.$store.state.tasks[this.listData._id] || []
      },
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.listConfig)
      },
      createTask() {
        this.$store.dispatch('createTask', { description: this.taskConfig.description, listId: this.listData._id, boardId: this.listData.boardId })
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', { listId: listId, boardId: this.listData.boardId })
      }
    },
    components: {
      Task
    },
    watch: {
      listData(val) {
        this.$store.dispatch('getTasks', this.listData._id)
      }
    }

  }

</script>

<style scoped>


</style>