<template>
  <div class="col-4 borderBox">
    <h3>{{listData.name}}</h3>
    <h5 class="">{{listData.description}}</h5>
    <form class=" mb-5 inline" @submit.prevent="createTask">
      <label for="desc"> Task </label>
      <input class="form-control" name="desc" type="text" v-model="taskConfig.description">
      <button class="btn icon" type="submit"><i class="fas fa-plus-square"></i></button>
    </form>

    <task v-for="task in tasks" :taskData="task"></task>

    Delete Board <i @click="deleteList(listData._id)" class="fas fa-trash-alt cursor"></i>
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

<style>
  .inline {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
</style>