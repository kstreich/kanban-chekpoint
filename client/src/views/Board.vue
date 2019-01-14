<template>
  <div class="board container-fluid boardBackground">
    <!-- <img class="giphyImg" src="https://thumbs.gfycat.com/WidePowerfulBeauceron-small.gif"> -->

    <div class="row title">
      <h3 class="textM">Time to soar to success</h3>
      <p>Create a board</p>
    </div>


    <form @submit.prevent="createList" class="mb-5 row">
      <div class="form-group col-5">
        <label for="listName"> Enter Your List Name </label>
        <input class="form-control" name="listName" type="text" v-model="listConfig.name">
      </div>
      <div class="form-group col-5">
        <label for="desc"> Add List Description </label>
        <input class="form-control" name="desc" type="text" v-model="listConfig.description">
      </div>
      <button type="submit" class="btn icon col-2 cursor">Add List</button>
    </form>

    <div class="lists row">
      <list v-for="list in lists" :listData="list">
      </list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import clouds from '../../public/assets/cloud.png'
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
        },
        clouds: clouds
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', { name: this.listConfig.name, description: this.listConfig.description, boardId: this.boardId })
        event.target.reset()
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

<style>
  .boardBackground {
    background-image: url('../../public/assets/cloud.png');
    height: 110vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  .borderBox {
    border: black solid 1px;
    border-top: black solid 2px;
    background: #fdfefc;
    border-radius: 15px;

  }

  .lists {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .title {
    display: flex;
    flex-direction: column
  }

  .giphyImg {
    height: 39vh;
  }

  .textM {
    margin-top: 40vh;
  }
</style>