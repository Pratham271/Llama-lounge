import React from 'react'

const LLmSkeleton = () => {
  return (
    <>
    {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/4">
            {/* <div className="flex items-center space-x-2  bg-gray-100 p-3 rounded-lg h-full"> */}
                {/* <div className="w-5 h-5  bg-gray-400 rounded animate-pulse"></div> */}
                <div className="w-full lg:w-[40rem] h-2  bg-gray-400 rounded animate-pulse dark:bg-gray-200"></div>
                <div className="w-2/3  lg:w-[18rem] h-2  bg-gray-400 rounded animate-pulse dark:bg-gray-200 mt-1.5"></div>
            </div>
        // </div>
    ))}
</>
  )
}

export default LLmSkeleton
