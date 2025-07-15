import Login from '../components/Auth/Login';
import AuthLayout from '../components/Layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout title="Real-Time Collab">
      <Login />
    </AuthLayout>
  );
} 