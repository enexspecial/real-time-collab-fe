import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../../utils/auth';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      setToken(data.login.accessToken);
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
    login({ variables: form });
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
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800">
          Sign up
        </Link>
      </div>
    </form>
  );
} 