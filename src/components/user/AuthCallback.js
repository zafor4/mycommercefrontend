import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming the backend response is accessible through URL parameters or a redirect
    const queryParams = new URLSearchParams(window.location.search);
    const response = queryParams.get('response'); // or however you receive the response

    if (response) {
      // Parse the JSON response
      const data = JSON.parse(response);


      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
};

export default OAuthCallback;