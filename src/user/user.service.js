import FacebookService from './facebook.service'
import store from './../store';
import cognitoIdentityPoolService from '../cognito/cognito-identity-pool.service';
import Database from '../database';

class UserService {

  facebookService

  constructor() {
    this.facebookService = new FacebookService(this.facebookAuthStatusChanged)
  }

  facebookAuthStatusChanged = (response) => {
    if (response.status !== 'connected') {
      this.cleanup();
    } else {
      this.initializeUser(response);
    }
  }

  loadUserDetails = () => {
    const database = new Database();
    cognitoIdentityPoolService.getCredentials()
      .then(credentials => database.get(credentials.params.IdentityId))
      .then(userDetails => store.commit('userDetailsUpdated', userDetails));
  }

  initializeUser = (response) => {
    cognitoIdentityPoolService.setFacebookCredentials(response.authResponse.accessToken);

    return this.facebookService.getMe()
      .then(me => {
        store.commit('userUpdated', {
          id: me.id,
          firstName: me.first_name,
          lastName: me.last_name,
          pictureUrl: me.picture.data.url,
        });
        return me.id;
      });
  }

  cleanup = () => {
    store.commit('userUpdated', {});
  }
}

export default new UserService();
