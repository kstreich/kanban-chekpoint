<template>
  <div v-if="" class="board">
    <h3>This is the Board View</h3>
    <form @submit.prevent="createList">
      <label for="listName"> Enter List Name </label>
      <input name="listName" type="text" v-model="listConfig.name">
      <label for="desc"> Add description </label>
      <input name="desc" type="text" v-model="listConfig.description">
      <button type="submit">Add</button>
    </form>
    {{lists}}
    <list v-for="list in lists" :listData="list"></list>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    mounted() {
      //dispatch to action that will send a get request to get the board with this.boardId (might be this.$route.params.boardId)
      //dispatch to get lists by boardId
      return this.$store.dispatch('getLists', this.$route.params.boardId)
    },
    data() {
      return {
        listConfig: {
          name: '',
          description: '',
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createList() {
        debugger
        this.$store.dispatch('createList', { name: this.listConfig.name, description: this.listConfig.description, boardId: this.boardId })
      }
    },

    //dont run because authenticate is being handled in main.js
    // created() {
    //   //blocks users not logged in
    //   if (!this.$store.state.user._id) {
    //     this.$router.push({ name: "login" });
    //   }
    // },
    components: {
      List
    },
    props: ["boardId"]
  };

  //auth id get from user in the state
  //board id is from the board
  //display the boards first 
</script>