import AWS, { CredentialProviderChain } from 'aws-sdk/global';
import { AWS_REGION } from '~/configuration';

AWS.config.update({
  region: AWS_REGION,
  credentialProvider: new CredentialProviderChain()
});

export * from './cognito';
