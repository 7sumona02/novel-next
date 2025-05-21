import Editor from '@/components/Editor'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='bg-neutral-200 min-h-dvh w-screen relative'>
      <h1 className='text-black text-center pt-10 underline font-sans'>notepad</h1>
      <div className='md:px-40 px-5 pb-20'>
        <Editor/>
      </div>
      <div className='absolute bottom-2 w-full text-center'>
        <Link href='https://github.com/7sumona02' className='text-neutral-500 text-xs'>Made with ♡ by Sumona</Link>
      </div>
    </div>
  )
}

export default page
