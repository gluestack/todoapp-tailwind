import React from 'react'
import Head from 'next/head'
import Input from '../components/Input'
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUser } from '../context/user';
import { SignInForm } from '../interfaces';
import { IUser } from '../interfaces'

import { useGlue, IAuthProviderEnum } from "@gluestack/glue-client-sdk-react";

const signin = () => {
  const { glue } = useGlue(["AUTH:*"]);
  const router = useRouter();
  const { updateUser }: any = getUser();
  const [formData, setFormData] = React.useState<SignInForm>({
    email: "",
    password: ""
  });
  const [error, setError] = React.useState('');

  const onChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      return setError("Please fill all fields!")
    }

    try {
      const response: any | IUser = await glue.auth.login({
        args: {
          email: formData.email,
          password: formData.password
        }
      });

      if (!response || typeof response === 'string') {
        setError(response ? response : "something went wrong!");
        return;
      }

      //@ts-ignore
      updateUser({
        id: response.id,
        name: response.name,
        email: response.email,
        token: response.token
      })

      router.push("/")
    } catch (error: any) {
      setError("someting went wrong!");
      console.log(error.message)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center mt-40 py-2 m-0 p-0">
      <Head>
        <title>LogIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center text-gray-700">
        <header className='font-thin text-4xl text-purple-800 m-6 select-none'>Sign In</header>
        <form className='flex flex-col w-72 mb-3'>
          <Input placeholder="Email" type="text" value={formData.email} label="Email" name="email" onChange={onChangeHandler} />
          <Input placeholder="Password" type="password" value={formData.password} label="Password" name="password" onChange={onChangeHandler} />
          <div className={`${!error && 'invisible'} text-red-400 font-mono`}>{error}</div>
          <Button onClick={submitHandler} className="mt-2 p-2 hover:bg-purple-500 hover:border-purple-500">Submit</Button>
        </form>
        <div className='text-lg font-thin text-left' >
          Don't have an account! <Link href={"/signup"} className='text-purple-500 font-normal'>SignUp</Link>
          <br />
          Go to <Link href={"/"} className='text-purple-500 font-normal'>Home</Link>
        </div>
      </main>
    </div>
  )
}

export default signin
