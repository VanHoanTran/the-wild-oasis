//import { da } from 'date-fns/locale';
import supabase, { supabaseUrl } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// if hasImage=true, image is imagePath
// if hasImage=false, create path from image object
function imagePathCreator(image) {
  const hasImage = typeof image === 'string';
  if (hasImage) {
    return { hasImage, imagePath: image };
  }
  const imageName = `${uuidv4()}-${image.name}`.replaceAll('/', '');
  const storageLocation = 'storage/v1/object/public/cabin-images';
  const imagePath = `${supabaseUrl}/${storageLocation}/${imageName}`;
  return { hasImage, imageName, imagePath };
}

async function uploadImage(image, imageName) {
  //const image = newCabin.image;
  const { error: uploadingError } = await supabase.storage
    .from('cabin-images')
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
    throw new Error(`Cabin with id=${id} could not be found`);
  }
}

export async function createCabin(newCabin) {
  const {
    hasImage,
    imageName = '',
    imagePath,
  } = imagePathCreator(newCabin.image);

  //1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created`);
  }

  if (hasImage) return data;
  //2. upload an image
  const { uploadingError } = await uploadImage(newCabin.image, imageName);

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
  console.log(newCabin);
  const { image, ...cabin } = newCabin;
  const { hasImage, imageName = '', imagePath } = imagePathCreator(image);

  const uploadCabin = hasImage ? cabin : { ...newCabin, image: imagePath };

  const { data, error } = await supabase
    .from('cabins')
    .update([uploadCabin])
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be updated`);
  }

  if (hasImage) return data;
  //2. upload an image

  const { uploadingError } = await uploadImage(newCabin.image, imageName);
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
