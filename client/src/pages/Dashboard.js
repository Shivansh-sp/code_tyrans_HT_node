import { useUser, UserButton } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #ccc'
      }}>
        <h1>Dashboard</h1>
        <UserButton />
      </header>
      
      <main style={{ padding: '1rem' }}>
        <h2>Welcome, {user.firstName}!</h2>
        <p>This is your protected dashboard.</p>
      </main>
    </div>
  );
};

export default Dashboard;