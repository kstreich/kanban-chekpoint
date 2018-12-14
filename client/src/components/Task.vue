<template>
  <div class="mb-4">
    <h5>{{taskData.description}}
      <!-- <span><button @click="deleteTask(taskData._id)">Delete</button></span>
      <span> -->
      <span><i @click="deleteTask(taskData._id)" class="fas fa-trash-alt cursor iconSize"></i></span></h5>

    <div class="dropdown">
      <button id="mLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-info">
        Move Task <i class="fas fa-caret-square-down"></i>
      </button>
      <div class="dropdown">
        <div class="dropdown-menu">
          <p>Available Lists</p>
          <div class="dropdown-item" aria-labelledby="mLabel" v-for="list in lists" :key="list._id">
            <p @click="moveTask(list._id)">{{list.name}}</p>
          </div>
        </div>
      </div>
    </div>
    </span>
    </h5>
    <!-- add a taks vv -->
    <!-- drop down for comments -->
    <div class="dropdown">
      <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-info">
        Comments <i class="fas fa-caret-square-down"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dLabel">
        <comment v-for="comment in comments" :commentData="comment"></comment>
        <div>
          <form @submit.prevent="createComment">
            <label for="desc"> Comment </label>
            <input name="desc" type="text" v-model="commentConfig.description">
            <button class="btn btn-info" type="submit"><i class="fas fa-plus-square"></i></button>
          </form>
        </div>
      </div>
    </div>


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
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createComment() {
        this.$store.dispatch('createComment', { description: this.commentConfig.description, taskId: this.taskData._id })
      },
      deleteTask(taskId) {
        this.$store.dispatch("deleteTask", { taskId: taskId, listId: this.taskData.listId });
      },
      moveTask(listId) {

        // let payload = {
        //   listData: this.lists,
        //   taskData: this.taskData
        // }
        this.$store.dispatch('moveTask', { listId, taskId: this.taskData._id })
      }
    },
    props: [
      'taskData'
    ],
    components: {
      Comment
    }
  }

  $('.dropdown-toggle').dropdown()
</script>

<style>


</style>