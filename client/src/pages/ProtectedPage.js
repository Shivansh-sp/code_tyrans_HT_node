import { useUser } from '@clerk/clerk-react';

const ProtectedPage = () => {
  const { user } = useUser();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Protected Page</h1>
      <p>Only authenticated users can see this content.</p>
      <p>Welcome, {user.emailAddresses[0].emailAddress}!</p>
    </div>
  );
};

export default ProtectedPage;