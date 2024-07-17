import React from 'react'

const LinksRenderer = () => {
  return (
    <div className="w-full rounded-md shadow flex flex-col items-center mt-12 ">
      <div className="flex-1 w-full max-h-full">
        <iframe src="https://js.langchain.com/v0.2/docs" className='h-[calc(100vh-6rem)] w-full'></iframe>
      </div>
    </div>
  )
}

export default LinksRenderer
