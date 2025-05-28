import { AuthLayout } from '../layouts/auth';
import { SignUpView } from '../sections/auth/sign-up-view';

export default function Register() {
  return (
    <AuthLayout>
      <SignUpView />
    </AuthLayout>
  );
}