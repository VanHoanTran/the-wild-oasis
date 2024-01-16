import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import useLogin from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';
function LoginForm() {
  const [email, setEmail] = useState('vanhoantran@example.com');
  const [password, setPassword] = useState('12345');
  const { login, isLoggingIn } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow variation='vertical' label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow variation='vertical' label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow variation='vertical'>
        <Button size='large' disabled={isLoggingIn}>
          {isLoggingIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
