<template>
  <div class="">
    <h3>This is the list component</h3>

  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {

      }
    },
    computed: {},
    methods: {
      createList() {
        this.$store.dispatch('createList', this.listConfig)
      }
    },
  }

</script>

<style scoped>


</style>