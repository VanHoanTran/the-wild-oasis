import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
      toast.success('New cabin successfully created');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const submitHandler = (data) => {
    mutate({ ...data, image: data.image.item(0) });
    console.log({ ...data, image: data.image.item(0) });
    // mutate(data);
  };
  const errorHandler = (err) => {
    console.log(err);
  };
  return (
    <Form onSubmit={handleSubmit(submitHandler, errorHandler)}>
      <FormRow label='Name' errors={errors}>
        <Input
          disabled={isCreating}
          type='text'
          id='name'
          {...register('name', {
            required: 'This field cannot be empty.',
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' errors={errors}>
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field cannot be empty.',
          })}
        />
      </FormRow>

      <FormRow label='Discount' errors={errors}>
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register('image', {
            required: 'This field cannot be empty.',
          })}
          id='image'
          accept='image/*'
        />
      </FormRow>

      {/* type is an HTML attribute! */}
      <FormRow>
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
