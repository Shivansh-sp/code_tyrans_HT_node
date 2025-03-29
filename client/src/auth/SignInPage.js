import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  }}>
    <SignIn path="/sign-in" routing="path" />
  </div>
);

export default SignInPage;