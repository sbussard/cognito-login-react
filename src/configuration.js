/*
AWS_SETTINGS is defined by webpack using
environment variables with the same name
*/

type StringMap = {
  [id: string]: string
};

export const {
  AWS_REGION,
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_USER_POOL_CLIENT_ID,
  AWS_COGNITO_FEDERATED_IDENTITY_POOL_ID,
  AWS_COGNITO_FEDERATED_IDENTITY_TOKEN,
  AWS_S3_BUCKET
} = AWS_SETTINGS; // eslint-disable-line no-undef

export const FORM_NAMES: StringMap = Object.freeze({
  LOGIN: 'LOGIN'
});

export const AWS_ERROR_MESSAGES: StringMap = Object.freeze({
  MISSING_CREDENTIALS: 'Missing credentials in config'
});

export const ROUTES: StringMap = Object.freeze({
  LOG_IN: '/',
  DASHBOARD: '/dashboard',
  LOGGED_OUT: '/bye'
});
