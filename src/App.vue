<template>
  <div id="demo-app">
    <nav class="top-navi">
      <div class="sm-logo">
        <i v-if="!getUser.id" class="material-icons">person_pin</i>
        <div v-else class="sm-logo__avatar-image" v-bind:style="{ backgroundImage: 'url(' + getUser.pictureUrl + ')' }"></div>
      </div>
      <h1>Demo</h1>
    </nav>
    <div class="main-content">
      <h1>{{ getUser.firstName }} {{ getUser.lastName }}</h1>
      <button
        class="details-button"
        v-if="!getUserDetails.status"
        v-on:click="loadDetails()"
      >
        Load user details
      </button>
      <ul v-if="getUserDetails.status">
        <li>Status: {{ getUserDetails.status }}</li>
        <li>Skills: {{ getUserDetails.skills }}</li>
      </ul>
      <facebook-login-button></facebook-login-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FacebookLoginButton from './components/facebook-login.button.vue';
  import userService from './user/user.service';

  export default {
    name: 'cognito-demo-app',
    computed: {
      ...mapGetters(['getUser', 'getUserDetails'])
    },
    methods: {
      loadDetails() {
        userService.loadUserDetails();
      }
    }
  }
</script>

<style lang="scss">
  *, ::after, ::before {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    color: inherit;
  }

  h2,
  h3,
  h4 {
    margin: 0;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }

  body, #demo-app {
    -webkit-font-smoothing: antialiased;
    padding: 0;
    margin: 0;
    font-family: 'Lato', sans-serif;
    background-color: $color-background;
  }

  .details-button {
    width: 150px;
    margin: 50px;
  }

  .main-content {
    transition: margin-left .5s;
    margin-top: $top-panel-height;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  .sm-logo {
    height: calc(100% + 5px);
    position: absolute;
    top: 0;
    left: 20px;
    width: 60px;
    background-color: #0b3340;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgba(255,255,255,0.4);
    border-radius: 0 0 $radius $radius;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);

    &__avatar-image {
      height: 40px;
      width: 40px;
      background-repeat: no-repeat;
      background-size: cover;
      -moz-border-radius: 20px;
      -webkit-border-radius: 20px;
      border-radius: 20px;
    }

    & > i {
      font-size: 32px;
    }
  }

  .top-navi {
    position: fixed;
    background-color: $color-menu;
    color: #fff;
    height: $top-panel-height;
    left: 0;
    right: 0;
    top: 0;
    z-index: $layer-top;
    padding: $base-line;

    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);

    h1 {
      flex-grow: 1;
      text-align: center;
      font-family: 'Shadows Into Light', cursive;
      color: rgba(0,0,0,0.84);
      padding-left: 60px;
    }
  }


  .slide-enter-active,
  .slide-leave-active{
    transition: 0.3s ease;
  }
  .slide-enter,
  .slide-leave-to {
    top: -100% !important;
  }
</style>
