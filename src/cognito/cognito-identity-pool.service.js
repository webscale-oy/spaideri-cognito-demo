class CognitoIdentityPoolService {

  identityPoolId;
  region;
  userPoolId;
  userPoolLoginMapKey;
  AWS;

  constructor() {
    /* global COGNITO_IDENTITY_POOL_ID  */
    this.identityPoolId = COGNITO_IDENTITY_POOL_ID;
    this.region = AWS_REGION;
    this.userPoolId = '';
    AWS.config.region = this.region;
    this.userPoolLoginMapKey = `cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
  }

  setFacebookCredentials = (facebookAccessToken) => {

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.identityPoolId,
      Logins: {
        'graph.facebook.com': facebookAccessToken,
      },
    });
  }

  setUserPoolCredentials = (userPoolIdTokenJwt) => {
    const logins = {};
    logins[`${this.userPoolLoginMapKey}`] = userPoolIdTokenJwt;
    this.AWS.config.credentials = new this.AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.identityPoolId,
      Logins: logins,
    });
  }

  getCredentials = () => {
    const promise = new Promise((resolve, reject) => {
      AWS.config.credentials.get((error) => {
        if (error) {
          console.log('error', error);
          reject(error);
        } else {
          resolve(AWS.config.credentials);
        }
      });
    });
    return promise;

  }

  clearCache = () => {
    this.AWS.config.credentials.clearCachedId();
  }

  getCustomAuthorizerAuthCognitoToken = () => this.getCredentials()
    .then(credentials => btoa(JSON.stringify({
      IdentityId: credentials.params.IdentityId,
      Logins: credentials.params.Logins,
    })))

  refresh = () => {
    const promise = new Promise((resolve, reject) => {
      this.AWS.config.credentials.refresh((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.AWS.config.credentials);
        }
      });
    });
    return promise;
  }
}

export default new CognitoIdentityPoolService();
