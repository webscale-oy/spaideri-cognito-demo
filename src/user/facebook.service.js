class FacebookService {

  constructor(facebookAuthStatusChangedCallback) {
    window.fbAsyncInit = function() {
      FB.init({
        appId            : FACEBOOK_APP_ID,
        autoLogAppEvents : true,
        xfbml            : true,
        status           : true,
        version          : FACEBOOK_API_VERSION
      });
      FB.AppEvents.logPageView();
      FB.Event.subscribe('auth.statusChange', facebookAuthStatusChangedCallback);
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  getMe = () => {
    return new Promise((resolve, reject) => {
      FB.api('/me', { fields: 'email,first_name,last_name,picture' }, (response) => {
        if (!response || response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  }

  getFriends = (userId) => {
    return new Promise((resolve, reject) => {
      FB.api(`/${userId}/friends`, (response) => {
        if (!response || response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  }

  getUserPictureUrl = (userId) => {
    return new Promise((resolve, reject) => {
      FB.api(`/${userId}/picture`, (response) => {
        if (!response || response.error) {
          reject(response);
        } else {
          resolve(response.data.url);
        }
      });
    });
  }

  getLoginStatus = () => {
    return new Promise((resolve, reject) => {
      try {
        FB.getLoginStatus((response) => {
          if (!response || response.error) {
            reject(response);
          } else {
            resolve(response);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default FacebookService;
