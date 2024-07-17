"use client"
import { CopyIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import Markdown from 'react-markdown'


interface LLMResponseProps {
    llmResponse: string;
}


const LlmResponseSkeleton = () => (
    <>
        {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-2 w-10 sm:w-1/2 md:w-1/4 ">
                {/* <div className="flex items-center space-x-2  bg-gray-100 p-3 rounded-lg h-full"> */}
                    {/* <div className="w-5 h-5  bg-gray-400 rounded animate-pulse"></div> */}
                    <div className="w-72 md:w-[40rem] lg:w-[70rem] h-1  bg-gray-400 rounded animate-pulse dark:bg-gray-200"></div>
                    <br />
                    <div className="w-60 md:w-96 lg:w-[40rem] h-1  bg-gray-400 rounded animate-pulse dark:bg-gray-200"></div>

                {/* </div> */}
            </div>
        ))}
    </>
);

const LLMResponseComponent = ({llmResponse}:LLMResponseProps) => {
    const hasLlmResponse = llmResponse && llmResponse.trim().length > 0;
    const [copy, setCopy] = useState(false)
    const handleCopy = () => {
        setCopy(true)
        setTimeout(()=> {setCopy(false)},2000)
        const code = document.getElementById("pretag")?.innerText
        navigator.clipboard.writeText(code!)
    }
  return (
    <>
      {
        hasLlmResponse ? (
            <div className='shadow-lg bg-white rounded-lg m-4 p-4 dark:bg-transparent'>
                <div className='flex items-center mb-3'>
                    <h2 className='text-lg font-semibold flex-grow'>Answer</h2>
                    <img src="./mistral.png" alt="groq logo" className='w-6 h-6 mr-2' />
                    <img src="./groq.png" alt="groq logo" className='w-6 h-6' />
                </div>
                <div className='leading-5'>
                    <Markdown 
                        components={{
                            code: ({ node, ...props }) => (
                                <code  {...props} className="bg-[#eeeaea] rounded p-[1.5px]  dark:bg-gray-500" />
                              ),
                              pre: ({ node, ...props }) => (
                                <div className='relative'>
                                    <pre id='pretag' {...props} className="bg-[#eeeaea] rounded-md m-[12px] p-[8px]  dark:bg-gray-500" />
                                    <button onClick={handleCopy} className='absolute top-2 right-10 flex text-sm items-center font-light '>{copy ? "Copied" : <CopyIcon/>} {copy ? null : "Copy Code"}
                                    </button>
                                </div>
                              ),
                        }}>
                        {llmResponse}
                    </Markdown>
                </div>
            </div>
        ):(
          <div className='shadow-lg bg-white rounded-lg m-4 p-4 dark:bg-transparent'>
            <LlmResponseSkeleton /> 
          </div>
        )}
    </>
  )
}

export default LLMResponseComponent
