import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/mutations';

export default function Signup({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const navigate = useNavigate();
  const [registerMutation, { loading, error }] = useMutation(REGISTER);
  const [formError, setFormError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    try {
      const { data } = await registerMutation({ variables: form });
      if (data?.register?.accessToken) {
        localStorage.setItem('accessToken', data.register.accessToken);
        localStorage.setItem('user', JSON.stringify(data.register.user));
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/notes');
        }
      } else {
        setFormError('Invalid signup response.');
      }
    } catch (err) {
      setFormError(err.message || 'Signup failed.');
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white tracking-tight">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          required
        />
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
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          minLength={6}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-base shadow transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        {(formError || error) && <div className="text-red-500 text-sm text-center">{formError || error?.message}</div>}
      </form>
      <div className="text-center text-sm mt-8 text-gray-600 dark:text-gray-300">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
          Login
        </Link>
      </div>
    </div>
  );
} 