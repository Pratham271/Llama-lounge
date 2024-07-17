'use client';
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { RiOpenaiFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { useRecoilState } from 'recoil';
import { aiModelAtom } from '@/store/atoms';

const LinksRenderer = () => {
  const [aiModel, setAIModel] = useRecoilState(aiModelAtom)
  const [displayAIModel, setDisplayAIModel] = useState("GPT-3.5-Turbo")
  return (
    <>
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
      <div className="space-x-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label='openai' variant={"ghost"}>
                <RiOpenaiFill className="h-4 w-4"/>
                <p className='px-1'>{displayAIModel}</p> <FaChevronDown className='h-2.5 w-2.5 opacity-50'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => {
                setAIModel("gpt-3.5-turbo")
                setDisplayAIModel("GPT-3.5-Turbo")
              }}>
                GPT-3.5-Turbo
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                setAIModel("gpt-4")
                setDisplayAIModel("GPT-4")
              }}>
                GPT-4
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                setAIModel("gpt-4o")
                setDisplayAIModel("GPT-4o")
              }}>
                GPT-4o
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>      
        </div>
      </div>
      <div className="w-full rounded-md shadow flex flex-col items-center mt-12 ">
        <div className="flex-1 w-full max-h-full">
          <iframe src="https://js.langchain.com/v0.2/docs/integrations/platforms" className='h-[calc(100vh-6rem)] w-full'></iframe>
        </div>
      </div>
    </>
  )
}

export default LinksRenderer
