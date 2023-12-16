'use server';

import { signIn } from '@/app/auth';

export const signInUser = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const res = await signIn('credentials', {
      username: email,
      password,
      redirect: false,
    });
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};
