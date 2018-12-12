<template>
  <div class="">
    <p>{{commentData.description}}</p>
    <button @click="deleteComment(commentData._id)">Delete</button>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    data() {
      return {

      }
    },
    computed: {},
    methods: {
      deleteComment(commentId) {
        this.$store.dispatch("deleteComment", { commentId: commentId, taskId: this.commentData.taskId });
      }
    },
    props: [
      'commentData'
    ]
  }

</script>

<style>


</style>