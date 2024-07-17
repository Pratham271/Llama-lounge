import React from 'react'

const UserMessageComponent = ({message}:{message:string}) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-4 m-4 dark:bg-transparent'>
      <div className='flex items-center'>
        <h2 className='text-lg font-semibold flex-grow'>{message}</h2>
      </div>
    </div>
  )
}

export default UserMessageComponent
