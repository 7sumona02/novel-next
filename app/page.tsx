import Editor from '@/components/Editor'
import React from 'react'

const page = () => {
  return (
    <div className='bg-neutral-200 min-h-screen'>
      <div className='px-40 py-10'>
        <Editor/>
      </div>
    </div>
  )
}

export default page