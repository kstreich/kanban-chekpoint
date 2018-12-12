<template>
  <div class="">
    <h5>Task Description: {{taskData.description}}</h5>

    <form class="mb-5" @submit.prevent="createComment">
      <label for="desc"> Comment </label>
      <input name="desc" type="text" v-model="commentConfig.description">
      <button type="submit">Add</button>
    </form>
    <button @click="deleteTask(taskData._id)">Delete</button>

    <comment v-for="comment in comments" :commentData="comment"></comment>

  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: 'Task',
    data() {
      return {
        commentConfig: {
          description: ''
        }
      }
    },
    mounted() {
      return this.$store.dispatch('getComments', this.taskData._id)

    },
    computed: {
      comments() {
        return this.$store.state.comments[this.taskData._id] || []
      }
    },
    methods: {
      createComment() {
        this.$store.dispatch('createComment', { description: this.commentConfig.description, taskId: this.taskData._id })
      },
      deleteTask(taskId) {
        this.$store.dispatch("deleteTask", { taskId: taskId, listId: this.taskData.listId });
      }
    },
    props: [
      'taskData'
    ],
    components: {
      Comment
    }
  }

</script>

<style>


</style>