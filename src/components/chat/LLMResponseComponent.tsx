'use client';
import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import LLmSkeleton from '../LLmSkeleton'
import { CopyIcon } from '../ui/Icons';



const LlmResponseComponent = ({content}:{content:string}) => {
    const hasLLMResponse = content && content.trim().length > 0 
    const cleanedMarkdown = content.replace(/=====/, ''); 
    const [copyStatus, setCopyStatus] = useState<boolean[]>([]);

  const handleCopy = (index:number) => {
    setCopyStatus((prev) => {
      const newCopyStatus = [...prev];
      newCopyStatus[index] = true;
      return newCopyStatus;
    });

    setTimeout(() => {
      setCopyStatus((prev) => {
        const newCopyStatus = [...prev];
        newCopyStatus[index] = false;
        return newCopyStatus;
      });
    }, 2000);

    const code = document.getElementById(`pretag-${index}`)?.innerText;
    navigator.clipboard.writeText(code!);
  };
  let preIndex = 0;
  return (
    <>
       {hasLLMResponse ? (
        <Card className="flex flex-col justify-center align-middle">
        <CardHeader className="px-3">
            <CardTitle className="flex justify-between">
            Answer  
            </CardTitle>
        </CardHeader>
        <CardContent className="text-md items-center">
            <Markdown components={{
                        code: ({ node, ...props }) => (
                            <code  {...props} className="bg-[#eeeaea] rounded p-[1.5px]  dark:bg-gray-800" />
                          ),
                          pre: ({ node, ...props }) => {
                            const currentIndex = preIndex++;
                            return(
                              <div className="relative">
                              <pre id={`pretag-${currentIndex}`} {...props} className="bg-[#eeeaea] rounded-md m-[12px] p-[8px] dark:bg-gray-800" />
                              <button onClick={() => handleCopy(currentIndex)} className="absolute top-2 right-5 flex text-sm items-center font-light">
                                {copyStatus[currentIndex] ? "Copied" : <CopyIcon />} {copyStatus[currentIndex] ? null : <p className="text-sm font-base"></p>}
                              </button>
                            </div>
                            )
                          },
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
