import generateGoogleVectorStore from '@/actions/googleChat'
import React from 'react'

const page = async() => {
    await generateGoogleVectorStore()
  return (
    <div>
      
    </div>
  )
}

export default page
