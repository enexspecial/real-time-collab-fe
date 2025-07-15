import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/mutations';

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [loginMutation, { loading, error }] = useMutation(LOGIN);
  const [formError, setFormError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    try {
      const { data } = await loginMutation({ variables: { input: form } });
      if (data?.login?.accessToken) {
        localStorage.setItem('accessToken', data.login.accessToken);
        localStorage.setItem('user', JSON.stringify(data.login.user));
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/notes');
        }
      } else {
        setFormError('Invalid login response.');
      }
    } catch (err) {
      setFormError(err.message || 'Login failed.');
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white tracking-tight">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-base shadow transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {(formError || error) && <div className="text-red-500 text-sm text-center">{formError || error?.message}</div>}
      </form>
      <div className="text-center text-sm mt-8 text-gray-600 dark:text-gray-300">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
} 