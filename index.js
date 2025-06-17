import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_XXXXXXXXX',
    userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
});

import { Auth } from 'aws-amplify';

// Sign up a user
await Auth.signUp({
  username: 'testuser',
  password: 'TestPassword123!',
  attributes: {
    email: 'test@example.com',
  }
});

// Confirm code (e.g., from email)
await Auth.confirmSignUp('testuser', '123456');

// Sign in
await Auth.signIn('testuser', 'TestPassword123!');

// Sign out
await Auth.signOut();
