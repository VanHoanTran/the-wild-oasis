import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import useCreateUpdateCabin from './useCreateUpdateCabin';

function CreateCabinForm({ cabinToEdit, hideForm }) {
  const { id: editId, ...editValues } = cabinToEdit ?? {};
  const isEditSession = Boolean(editId);
  const { isWorking, createOrUpdateCabin } = useCreateUpdateCabin({
    isEditSession,
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const submitHandler = (data) => {
    // CREATE: ALWAYS HAS TO BE UPLOADED ==>
    // data.image.length > 0 && data.image !== 'string'
    // EDIT: existed image ==>: 1. data.image.length > 0 && data.image === string
    // EDIT: choose one but not upload ==> 2. data.image.length === 0 && data.image === null (object)
    const image =
      data.image.length > 0 && typeof data.image !== 'string'
        ? data.image.item(0)
        : editValues.image;

    const onSuccess = () => {
      reset();
      hideForm?.();
    };

    isEditSession
      ? createOrUpdateCabin(
          {
            id: editId,
            newCabin: { ...data, image },
          },
          {
            onSuccess: onSuccess,
          }
        )
      : createOrUpdateCabin(
          { ...data, image },
          {
            onSuccess: onSuccess,
          }
        );
  };
  const errorHandler = (err) => {
    console.log(err);
  };
  return (
    <Form
      onSubmit={handleSubmit(submitHandler, errorHandler)}
      type={hideForm ? 'modal' : 'regular'}
    >
      <FormRow label='Name' errors={errors}>
        <Input
          disabled={isWorking}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field cannot be empty.',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' errors={errors}>
        <Input
          disabled={isWorking}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field cannot be empty.',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' errors={errors}>
        <Input
          disabled={isWorking}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field cannot be empty.',
          })}
        />
      </FormRow>

      <FormRow label='Discount' errors={errors}>
        <Input
          disabled={isWorking}
          type='number'
          id='discount'
          {...register('discount', {
            min: {
              value: 0,
              message: 'Discount cannot be less than 0.',
            },
            validate: (value, formValues) =>
              Number(value) <= Number(formValues.regularPrice) ||
              'Discount cannot be greater than regular Price',
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label='Description for the room' errors={errors}>
        <Textarea
          disabled={isWorking}
          type='number'
          id='description'
          {...register('description', {
            required: 'This field cannot be empty.',
          })}
          defaultValue=''
        />
      </FormRow>

      <FormRow label='Cabin photo' errors={errors}>
        <FileInput
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field cannot be empty.',
          })}
          id='image'
          accept='image/*'
        />
      </FormRow>

      {/* type is an HTML attribute! */}
      <FormRow>
        <Button variation='secondary' type='reset' onClick={() => hideForm?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? `Edit cabin` : `Add cabin`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
