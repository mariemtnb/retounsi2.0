import { useState } from 'react';
import { registerUser } from '../../services/api';
import SignupUI from './SignupUI';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    telephone: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await registerUser(formData);

      setSuccess(true);
      alert("Account created successfully! You can now sign in.");
      window.location.href = '/login'; 
    } catch (err) {
      if (err.response && err.response.data) {
        const details = err.response.data;
        const msg =
          details?.email?.[0] ||
          details?.username?.[0] ||
          details?.password?.[0] ||
          details?.telephone?.[0] ||
          'Registration failed. Please check your input.';
        setError(msg);
      } else {
        setError("An error occurred during registration.");
      }
    }
  };

  return (
    <SignupUI
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );
}

export default Signup;