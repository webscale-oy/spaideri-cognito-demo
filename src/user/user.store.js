export default {
  state: {
    user: {},
    userDetails: {}
  },

  getters: {
    getUser(state) {
      return state.user;
    },
    getUserDetails(state) {
      return state.userDetails;
    }
  },

  mutations: {
    userUpdated(state, user) {
      state.user = user;
    },
    userDetailsUpdated(state, userDetails) {
      state.userDetails = userDetails;
    }
  }
}
