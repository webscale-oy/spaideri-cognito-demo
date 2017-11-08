<template>
  <div
      class="fb-login-button"
      data-max-rows="1"
      data-size="large"
      data-width="320"
      data-button-type="login_with"
      data-show-faces="false"
      data-auto-logout-link="true"
      data-use-continue-as="true"
      data-scope="public_profile,email,user_friends"
  >
  </div>
</template>

<script>
  export default {
    name: 'facebook-login-button',
  }
</script>

<style lang="scss" scoped>
</style>
