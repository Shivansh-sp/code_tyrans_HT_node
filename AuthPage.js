import { useClerk } from '@clerk/clerk-react';

const AuthPage = () => {
  const { signIn } = useClerk();

  const handleSOS = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await signIn.getToken()}`
        },
        body: JSON.stringify({
          userPhone: "+1234567890", // Replace with actual phone
          message: "Emergency alert from user"
        })
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("SOS failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => signIn.authenticateWithRedirect()}>
        Sign in with Clerk
      </button>
      <button onClick={handleSOS} style={{ marginTop: '20px' }}>
        Send SOS
      </button>
    </div>
  );
};

export default AuthPage;