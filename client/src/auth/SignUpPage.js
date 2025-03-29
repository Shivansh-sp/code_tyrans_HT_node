import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  }}>
    <SignUp path="/sign-up" routing="path" />
  </div>
);

export default SignUpPage;