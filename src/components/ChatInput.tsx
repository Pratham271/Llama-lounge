'use client';
import React, { useRef } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { inputAtom, inputBoxDisabledAtom } from '../../store/atoms/input';
// import { loadingAtom } from '../../store/atoms/loading';

const ChatInput = ({isDisabled, handleFormSubmit}: {isDisabled:boolean, handleFormSubmit:()=>void}) => {

    // const [input,setInput] = useRecoilState(inputAtom)
    // const [disabled,setDisabled] = useRecoilState(inputBoxDisabledAtom)
    // const loading = useRecoilValue(loadingAtom)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

   
  return (
    <div className="absolute bottom-0 left-0 w-full">
        <form className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                <div className="flex flex-col w-full flex-grow p-4">
                    <div className="relative">
                        <Textarea 
                            rows={1} 
                            maxRows={4} 
                            autoFocus 
                            // value={input}
                            // onChange={(e) => setInput(e.target.value)}
                            ref={textareaRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault()
              
                                  handleFormSubmit()
              
                                  textareaRef.current?.focus()
                                }
                              }}
                            placeholder="Enter your question..."
                            className="resize-none pr-12 text-base py-3"/>
                        
                        <Button 
                        className="absolute bottom-1.5 right-[8px]" 
                        aria-label='send message' 
                        // disabled={loading || isDisabled}
                        onClick={(e) => {
                            e.preventDefault()
                            handleFormSubmit()
                            textareaRef.current?.focus()
                        }}>
                            <PaperPlaneIcon className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ChatInput
