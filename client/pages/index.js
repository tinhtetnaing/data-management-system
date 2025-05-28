import { AuthLayout } from '../layouts/auth';
import { SignInView } from '../sections/auth/sign-in-view';

export default function Login() {
  return (
    <AuthLayout>
      <SignInView />
    </AuthLayout>
  );
}