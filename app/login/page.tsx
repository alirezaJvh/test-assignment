"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInUser } from "@/app/lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import authImage from "../assets/car.jpeg";
import { TextField } from "../ui/TextField";
import { Button } from "../ui/Button";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onLogin: SubmitHandler<Inputs> = async data => {
    console.log("onSumbit");
    console.log(errors);
    console.log(data);
    try {
      await signInUser(data.email, data.password);
      push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const lefImageWrapper = (
    <div
      className="hidden lg:flex col-span-6 h-[calc(100vh - 64px)]"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Image
        src={authImage}
        className="rounded-[32px]"
        alt="Picture of the author"
      />
    </div>
  );

  const forms = (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex flex-col gap-8 lg:gap-5 2xl:gap-8 w-full"
    >
      <TextField
        title="Email"
        placeholder="Enter Your Email"
        name="email"
        register={register}
        rules={{ required: "Email is required" }}
        error={errors.email?.message}
      />
      <div>
        <TextField
          title="Password"
          placeholder="Enter Your Password"
          name="password"
          register={register}
          rules={{ required: "Password is required" }}
          error={errors.password?.message}
        />
      </div>
      <Button type="submit" size="large">
        Sign in
      </Button>
    </form>
  );

  return (
    <div className="grid grid-cols-10 p-6 2xl:p-8 min-h-[100vh] w-full">
      {lefImageWrapper}
      <div className="col-span-10 lg:col-span-4 h-full pt-6 2xl:pt-8 flex justify-center">
        <div className="flex flex-col items-center gap-16 lg:gap-10 2xl:gap-16 w-[410px]">
          <div className="text-xl font-semibold">Welcome Back to RentCar</div>
          {forms}
        </div>
      </div>
    </div>
  );
}
