import React from 'react'
import Markdown from 'react-markdown'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'

const UserMessageComponent = ({userMessage}:{userMessage:string}) => {
  return (
    <>
       <Card className="flex flex-col justify-center align-middle">
            <CardHeader className="px-6">
                <CardTitle>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-md items-center">
                <Markdown components={{
                            code: ({ node, ...props }) => (
                                <code  {...props} className="bg-[#eeeaea] rounded p-[1.5px]  dark:bg-gray-800" />
                              ),
                              pre: ({ node, ...props }) => (
                                <div className='relative'>
                                    <pre id='pretag' {...props} className="bg-[#eeeaea] rounded-md m-[12px] p-[8px]  dark:bg-gray-800" />
                                </div>
                              ),
                        }}>
                  {userMessage}
                </Markdown>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    </>
  )
}

export default UserMessageComponent
