import AWS from 'aws-sdk/global';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'amazon-cognito-identity-js';

import {
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_USER_POOL_CLIENT_ID,
  AWS_COGNITO_FEDERATED_IDENTITY_POOL_ID,
  AWS_COGNITO_FEDERATED_IDENTITY_TOKEN
} from '~/configuration';

let authenticateUser = async (cognitoUser, authenticationDetails) =>
  new Promise((resolve, reject) => {
    let options = {
      onSuccess(result) {
        let jwtToken = result.getIdToken().getJwtToken();
        resolve(jwtToken);
      },
      onFailure(err) {
        reject(err);
      },
      mfaRequired(codeDeliveryDetails) {
        let mfaCode = prompt('Please enter MFA code'); // eslint-disable-line no-alert
        cognitoUser.sendMFACode(mfaCode, options);
      },
      newPasswordRequired(userAttributes, requiredAttributes) {
        delete userAttributes.email_verified; // the api doesn't accept this field back
        let newPassword = prompt('A new password is required.\nPlease enter a new password.'); // eslint-disable-line no-alert
        cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, options);
      }
    };

    cognitoUser.authenticateUser(authenticationDetails, options);
  });

export let getCognitoJwtToken = async ({Username, Password}) => {
  let authenticationDetails = new AuthenticationDetails({
    Username,
    Password
  });

  let cognitoUserPool = new CognitoUserPool({
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID
  });

  let cognitoUser = new CognitoUser({
    Username,
    Pool: cognitoUserPool
  });

  try {
    let jwtToken = await authenticateUser(cognitoUser, authenticationDetails);
    return jwtToken;
  } catch (err) {
    throw new Error(err);
  }
};

export let authenticateWithCognito = async ({username, password}) => {
  let jwtToken = await getCognitoJwtToken({
    Username: username,
    Password: password
  });

  let credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_COGNITO_FEDERATED_IDENTITY_POOL_ID,
    Logins: {
      [AWS_COGNITO_FEDERATED_IDENTITY_TOKEN]: jwtToken
    }
  });

  AWS.config.credentialProvider.providers.push(credentials);
};
