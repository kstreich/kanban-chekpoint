<template>
  <div id="app">
    <div class="header row">
      <i class="fas fa-cloud"></i>
      <span>Kanban Cloud</span>
      <a class="col-1 cursor marginHeader" @click="goToBoards">Boards</a>
      <a class="col-1 cursor" @click="logout" v-if="user._id">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>

  export default {
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        return this.$store.dispatch('logout')
      },
      goToBoards() {
        return this.$store.dispatch('goToBoards')
      }
    },
  }
</script>

<style>
  .header {
    background-color: #f58337;
    color: white;
    padding: 11px;
    /* height: 6px; */
    padding-left: 47px;
  }

  .marginHeader {
    margin-left: 45rem;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>