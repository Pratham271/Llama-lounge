import React from 'react'

import ReactMarkdown from 'react-markdown'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

const SourcesComponent = ({sources}:{sources:{title:string, source:string}[]}) => {
  const hasSources = sources && sources.length>0
  return (
    <>
    {hasSources? (<Card className='w-full'>
      <CardHeader className='px-1'>
        <CardTitle>
           <CardContent>
           {sources && sources.length>0 && (
                <Accordion type='single' collapsible className='w-full font-medium text-md mt-5'>
                    <h1 className='font-bold'>Sources</h1>
                    {sources.map((source,index)=> (
                        <AccordionItem value={`source-${index}`} key={index} className='pt-1 items-center'>
                            <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                            <AccordionContent className='pt-4'>
                                <ReactMarkdown className={"text-lg"}>
                                    {source.title}
                                </ReactMarkdown>
                                <br />
                                <p className='text-sm'>Link: <span className='text-blue-500 cursor-pointer hover:underline'>{source.source}</span></p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
           </CardContent>
        </CardTitle>
    </CardHeader>
  </Card>): <div className="p-2 w-full sm:w-1/2 md:w-1/4"></div>}
    </>
  )
}

export default SourcesComponent
