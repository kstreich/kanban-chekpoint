<template>
  <div class="boards container-fluid">
    <h1 class="mt-5">Soar through the clouds of success.</h1>
    <p class="mb-5">Create a to-do board below.</p>
    <form @submit.prevent="addBoard" class="mb-5">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit" class="btn btn-primary"><i class="fas fa-plus-square"></i></button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">
        <h3>{{board.title}} - {{board.description}}</h3>
      </router-link>
      <i @click="deleteBoard(board._id)" class="fas fa-trash-alt cursor iconSize"></i>

    </div>

    <img class="picture" src="../../public/assets/cloud.png">
  </div>

</template>

<script>
  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    }
  };
</script>
<style>
  body {
    background-color: #8dcfd0;

  }

  .picture {
    background-image: url("../../public/assets/cloud.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 30vh;
    min-width: 100%
  }

  .cursor {
    cursor: pointer;
  }

  .iconSize {
    font-size: 20px;
  }
</style>