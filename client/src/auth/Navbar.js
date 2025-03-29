import { Link } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      borderBottom: '1px solid #ccc'
    }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        {isSignedIn && (
          <Link to="/protected-page" style={{ marginRight: '1rem' }}>Protected Page</Link>
        )}
      </div>
      
      <div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <>
            <Link to="/sign-in" style={{ marginRight: '1rem' }}>Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;