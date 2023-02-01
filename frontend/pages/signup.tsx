import React from 'react'
import Head from 'next/head'
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUser } from '../context/user';
import { SignUpForm } from '../interfaces';

const signup = () => {
  const router = useRouter();
  const { updateUser }: any = getUser();
  const [formData, setFormData] = React.useState<SignUpForm>({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = React.useState('');

  const onChangeHandler = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return setError("Please fill all fields!")
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENGINE_AUTH_URL}/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!data.success) {
        console.log(data.message);
        setError(data.message);
        return
      }

      updateUser({
        id: data?.data?.id,
        name: data?.data?.name,
        email: data?.data?.email,
        token: data?.data?.token
      })

      router.push("/")
    } catch (error: any) {
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
        <header className='font-thin text-4xl text-purple-800 m-6 select-none'>Sign Up</header>
        <form className='flex flex-col w-72 mb-3'>
          <Input placeholder="Name" type="text" value={formData.name} label="Name" name="name" onChange={onChangeHandler} />
          <Input placeholder="Email" type="text" value={formData.email} label="Email" name="email" onChange={onChangeHandler} />
          <Input placeholder="Password" type="password" value={formData.password} label="Password" name="password" onChange={onChangeHandler} />
          <div className={`${!error && 'invisible'} text-red-400 font-mono`}>{error}</div>
          <Button onClick={submitHandler} className="mt-2 hover:bg-purple-500 hover:border-purple-500">Submit</Button>
        </form>
        <div className='text-lg font-thin text-left' >
          Already have an account! <Link href={"/signin"} className='text-purple-500 font-normal'>SignIn</Link>
          <br />
          Go to <Link href={"/"} className='text-purple-500 font-normal'>Home</Link>
        </div>
      </main>
    </div>
  )
}

export default signup
