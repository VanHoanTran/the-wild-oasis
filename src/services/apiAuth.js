import { imagePathCreator, uploadImage } from './apiCabins';
import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

//USER LOGIN
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return { data, error };
}

//
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserData({ fullName, avatar }) {
  const storage = 'avatars';
  const { imageName, imagePath } = imagePathCreator(avatar, storage);
  console.log({ fullName, imagePath });

  const uploadData =
    imageName === ''
      ? {
          fullName,
        }
      : { fullName, avatar: imagePath };
  const { data, error } = await supabase.auth.updateUser({
    data: uploadData,
  });
  if (error) throw new Error(error.details);
  if (imageName === '') return data;

  const { uploadingError } = await uploadImage(avatar, imageName, storage);
  if (uploadingError) throw new Error(uploadingError.message);
  return data;
}

export async function updateUserPassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
