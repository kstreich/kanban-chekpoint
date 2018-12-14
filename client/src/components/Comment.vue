<template>
  <div class="">
    <p>{{commentData.description}}
      <span><i @click="deleteComment(commentData._id)" class="fas fa-trash-alt"></i></span> </p>
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