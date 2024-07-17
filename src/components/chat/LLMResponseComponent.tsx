import React from 'react'
import Markdown from 'react-markdown'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import LLmSkeleton from '../LLmSkeleton'



const LlmResponseComponent = ({content}:{content:string}) => {
    const hasLLMResponse = content && content.trim().length > 0 
    const cleanedMarkdown = content.replace(/=====/, ''); 
  return (
    <>
       {hasLLMResponse ? (
        <Card className='flex flex-col justify-center align-middle'>
        <CardHeader className='px-3'>
            <CardTitle className='flex justify-between'>
            Answer  
            </CardTitle>
        </CardHeader>
        <CardContent className='text-md items-center'>
            <Markdown components={{
                        code: ({ node, ...props }) => (
                            <code  {...props} className="bg-[#eeeaea] rounded p-[1.5px]  dark:bg-gray-800" />
                          ),
                          pre: ({ node, ...props }) => (
                            <div className='relative'>
                                <pre id='pretag' {...props} className="bg-[#eeeaea] rounded-md m-[12px] p-[8px]  dark:bg-gray-800" />
                            </div>
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              {...props}
                              className="mt-3 list-inside list-disc first:mt-0"
                            />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              className="mt-3 text-underline text-blue-500"
                            />
                          ),
                          li: ({ node, ...props }) => <li {...props} className="mt-1" />,
                    }}>
              {cleanedMarkdown}
            </Markdown>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
       ): <div className='bg-white shadow-lg dark:bg-transparent rounded-md'><LLmSkeleton/></div>}
       
    </>
  )
}

export default LlmResponseComponent
