import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../../utils/auth';

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(data: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export default function Signup({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      setToken(data.signup.accessToken);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/notes');
      }
    },
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup({ variables: form });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        value={form.email} 
        onChange={handleChange} 
        className="input w-full px-3 py-2 border rounded" 
        required 
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        value={form.password} 
        onChange={handleChange} 
        className="input w-full px-3 py-2 border rounded" 
        required 
      />
      <button 
        type="submit" 
        className="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" 
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-800">
          Login
        </Link>
      </div>
    </form>
  );
} 