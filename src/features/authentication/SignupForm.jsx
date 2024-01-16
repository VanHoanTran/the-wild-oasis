import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSignUp from './useSignUp';

// Email regex: /\S+@\S+\.\S+/
// const defaultValues = {
//   fullName: '',
//   email: '',
//   password: '',
//   passwordConfirm: '',
// };
function SignupForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignUp();
  const onValid = ({ fullName, email, password }) => {
    signup(
      { fullName, email, password },
      {
        onSettled: reset(),
      }
    );
  };

  // const onInvalid = (data) => {
  //   console.log(data);
  // };

  return (
    //<Form onSubmit={handleSubmit(onValid, onInvalid)}>
    <Form onSubmit={handleSubmit(onValid)}>
      <FormRow label='Full name' errors={errors}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Email address' errors={errors}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow label='Password (min 8 characters)' errors={errors}>
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password need at least 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' errors={errors}>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords does not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading} type='submit'>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
