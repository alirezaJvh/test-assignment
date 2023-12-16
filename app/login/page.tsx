'use client';

// import './index.scss';
import React, { useState } from 'react';
import Image from 'next/image';
import authImage from '../assets/car.jpeg';
// import { Logo } from '@/components/Logo';
import { GroupButton } from '../ui/GroupButton';
import { TextField } from '../ui/TextField';
import { Button } from '../ui/Button';
// import { SocialButton } from '@/components/social-button';
// import { CheckBox } from '@/components/form/CheckBox';
import { useRouter } from 'next/navigation';
// import { signInUser } from '@/app/lib/auth';

export default function Login() {
  const { push } = useRouter();
  // const data = await getData();
  const [authAction, setAuthAction] = useState<string>('Sign in');
  // eslint-disable-next-line
  const [email, setEmail] = useState<string>('');
  // eslint-disable-next-line
  const [password, setPassword] = useState<string>('');
  // eslint-disable-next-line
  const [fullNamem, setFullName] = useState<string>('');

  const handleToggleClick = (currentAction: string) => {
    setAuthAction(currentAction);
  };

  const test = () => {
    console.log('open Modal');
  };

  const login = async () => {
    console.log('here')
    // try {
    //   await signInUser(email, password);
    //   console.log('here');
    //   push('/dashboard');
    // } catch (error: unknown) {
    //   console.log(error);
    // }
  };

  const lefImageWrapper = (
    <div
      className="hidden lg:flex col-span-6 h-[calc(100vh - 64px)]"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <Image
        src={authImage}
        className="rounded-[32px]"
        alt="Picture of the author"
      />
    </div>
  );

  const welcomBox = (
    <div
      className={`text-xl font-semibold ${
        authAction === 'Sign in' ? '' : 'hidden'
      }`}
    >
      Welcome Back to RentCar
    </div>
  );

  const forms = (
    <div className="flex flex-col gap-8 lg:gap-5 2xl:gap-8 w-full">
      <div
        className={`${
          authAction === 'Sign in' ? 'hidden' : 'animate-fade-in-name '
        }`}
      >
        <TextField
          title="Full Name"
          placeholder="Enter Your Name"
          onChange={setFullName}
        />
      </div>
      <TextField
        title="Email"
        placeholder="Enter Your Email"
        onChange={setEmail}
      />
      <div>
        <TextField
          title="Password"
          placeholder="Enter Your Password"
          hint={
            authAction === 'Sign up'
              ? 'Password must contain characters and numbers'
              : ''
          }
          onChange={setPassword}
        />
      </div>
      {authAction === 'Sign up' && (
        <Button onClick={test} size="large">
          Create Account
        </Button>
      )}
    </div>
  );


  return (
    <div className="grid grid-cols-10 p-6 2xl:p-8 min-h-[100vh] w-full">
      {lefImageWrapper}
      <div className="col-span-10 lg:col-span-4 h-full pt-6 2xl:pt-8 flex justify-center">
        <div className="flex flex-col items-center gap-16 lg:gap-10 2xl:gap-16 w-[410px]">
          {/* <Logo /> */}
          <GroupButton<string>
            buttonList={['Sign in', 'Sign up']}
            initialButton="Sign in"
            handleClick={handleToggleClick}
          />
          {welcomBox}
          {forms}
          {authAction === 'Sign in' && (
            <Button onClick={() => login()} size="large">
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
