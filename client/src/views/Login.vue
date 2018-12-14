<template>
  <div class="login">

    <img class="loginPic" src="../../public/assets/balloons-mountains2.png">

    <div class="container-fluid seller">
      <h1>Kanban Cloud</h1>
      <i class="fas fa-cloud logoText"></i>
      <h4>Let our cloud organizer help make your life a little easier.</h4>
      <p>Create to-do lists on the fly with our amazing programming software.</p>
      <p>Log-in or register below to get started.</p>
      <form v-if="loginForm" @submit.prevent="loginUser" class="loginMargin">
        <input type="email" v-model="creds.email" placeholder="email">
        <input type="password" v-model="creds.password" placeholder="password">
        <button type="submit" class="btn btn-info btn-sm">Login</button>
      </form>
      <form v-else @submit.prevent="register" class="loginMargin loginBox">
        <input type="text" v-model="newUser.name" placeholder="name">
        <input type="email" v-model="newUser.email" placeholder="email">
        <input type="password" v-model="newUser.password" placeholder="password">
        <button type="submit" class="btn btn-info">Create Account</button>
      </form>
      <div @click="loginForm = !loginForm" class="pointer">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .pointer {
    cursor: pointer;
  }

  .loginPic {
    max-width: 100%;
    background-position: center
  }

  .seller {
    background-color: #f9f9f9;
    height: 70vh;
  }

  .logoText {
    margin-bottom: 7vh;
  }

  .loginMargin {
    margin-top: 13vh;
  }

  .loginBox {
    display: flex;
    flex-direction: column;
    width: 16rem;
    justify-content: center;
    margin-left: 50vh;
  }
</style>