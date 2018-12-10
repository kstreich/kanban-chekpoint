<template>
  <div class="board">
    <h3>This is the Board View</h3>
    <form>
      <label for="listName"> Enter List Name </label>
      <input name="listName" type="text" v-model="listConfig.name">
      <label for="desc"> Add description </label>
      <input name="desc" type="text" v-model="listConfig.description">
      <button type="submit" @click="createList">Add</button>
    </form>
    <list></list>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    data() {
      return {
        listConfig: {
          name: '',
          description: '',
          boardId: props.boardId,
          authorId: ''
        }
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.listConfig)
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    components: {
      List
    },
    props: ["boardId"]
  };
</script>