//import { da } from 'date-fns/locale';
import supabase from './supabase';
import { v4 as uuidv4 } from 'uuid';

export function imagePathCreator(image, storage) {
  //there is no image uploaded
  if (image === null) {
    return { imageName: '', imagePath: '' };
  }

  // there is an existed imagePath, don't upload again
  if (typeof image === 'string') {
    return { imageName: '', imagePath: image };
  }

  // there is a image object would like to upload
  const imageName = `${uuidv4()}-${image.name}`.replaceAll('/', '');
  const storageLocation = `storage/v1/object/public/${storage}`;
  // eslint-disable-next-line no-undef
  const imagePath = `${JSON.stringify(
    import.meta.env.VITE_SUPABASE_URL
  )}/${storageLocation}/${imageName}`;
  return { imageName, imagePath };
}

export async function uploadImage(image, imageName, storage) {
  //const image = newCabin.image;
  const { error: uploadingError } = await supabase.storage
    .from(storage)
    .upload(imageName, image, {
      cacheControl: '3600',
      upsert: false,
    });
  return { uploadingError };
}

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error(error.details);
  }
}

export async function createCabin(newCabin) {
  const storage = 'cabin-images';
  const { imageName, imagePath } = imagePathCreator(newCabin.image, storage);

  //1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.details);
  }

  if (imageName === '') return data;

  //2. upload an image
  const { uploadingError } = await uploadImage(
    newCabin.image,
    imageName,
    storage
  );

  //3. Delete the cabin IF there was an error uploading image
  if (uploadingError) {
    await deleteCabin(data.id);
    console.error(uploadingError);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not created`
    );
  }
  return data;
}

export async function updateCabin({ id, newCabin }) {
  const storage = 'cabin-images';
  const { image, ...cabin } = newCabin;
  const { imageName, imagePath } = imagePathCreator(image, storage);
  console.log(id);
  // if there is no imageName means upload cabin without an image
  const uploadCabin =
    imageName === '' ? cabin : { ...newCabin, image: imagePath };
  console.log({ imageName, imagePath });
  const { data, error } = await supabase
    .from('cabins')
    .update([uploadCabin])
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be updated`);
  }

  if (imageName === '') return data;
  //2. upload an image

  const { uploadingError } = await uploadImage(
    newCabin.image,
    imageName,
    storage
  );
  if (uploadingError) {
    //3. Delete the cabin IF there was an error uploading image
    await deleteCabin(data.id);
    console.error(uploadingError);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not created`
    );
  }

  return data;
}
