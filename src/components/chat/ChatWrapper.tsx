'use client';
import React, { useEffect, useRef, useState } from 'react'

import { type AI } from '../../actions/chat';


import UserMessageComponent from './UserMessageComponent'

import SourcesComponent from './SourcesComponent'



import LLMResponseComponent from './LLMResponseComponent';
import ChatInput from './ChatInput';
import { readStreamableValue, useActions } from 'ai/rsc';
import { Message, StreamMessage } from '@/types';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { aiModelAtom, initialMessageAtom, inputAtom, inputBoxDisabledAtom } from '@/store/atoms';
import getSources from '@/actions/sources';


const ChatComponent = () => {
   // set up actions that will be used to stream all the messages  
  const {myAction} = useActions<typeof AI>();

  const aiModel = useRecoilValue(aiModelAtom)
  const [messages, SetMessages] = useState<Message[]>([]);
  const [input,setInput] = useRecoilState(inputAtom)
  const [initialMessage,setInitialMessage] = useRecoilState(initialMessageAtom)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  

  const setDisabled = useSetRecoilState(inputBoxDisabledAtom)

//   // state for displaying the current llm response while streaming
  useEffect(()=> {
   
   if(messages.length>1 && scrollRef.current){
      scrollRef.current.scrollIntoView()
   }
  
},[messages])



const handleFormSubmit = async() => {
  const messageToSend = input.trim();
  setInput('')
  setInitialMessage(false)
  if(!messageToSend) return;
  await handleUserMessageSubmission(messageToSend)
}

const handleUserMessageSubmission = async(userMessage:string) => {
  if(!userMessage) return;
  setInitialMessage(false)
    const newMessageId = Date.now()
    const newMessage = {
      id: newMessageId,
      type: 'userMessage',
      userMessage: userMessage,
      content: '',
      isStreaming: true,
      sources: [],
    };
    SetMessages(prevMessage =>[...prevMessage, newMessage]);
    setDisabled(true)
    let lastAppendResponse = "";
    try {
      
      const streamableValue = await myAction(userMessage,messages, aiModel);
      for await(const message of readStreamableValue(streamableValue)){
        const typedMessage = message as StreamMessage
        SetMessages((prevMessages) => {
          const messagesCopy = [...prevMessages]
          const messageIndex = messagesCopy.findIndex(msg => msg.id === newMessageId)
          if(messageIndex!==-1){
            const currentMessage = messagesCopy[messageIndex]
            if(typedMessage.llmResponse && typedMessage.llmResponse !== lastAppendResponse){
              currentMessage.content += typedMessage.llmResponse;
              lastAppendResponse = typedMessage.llmResponse
            }
            if(typedMessage.llmResponseEnd){
              currentMessage.isStreaming = false;
            }
          }
          return messagesCopy
        })
        
      }

      
      try {
      const sources = await getSources(userMessage);
      SetMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const messageIndex = updatedMessages.findIndex(msg => msg.id === newMessageId);
        if (messageIndex !== -1) {
          // @ts-ignore
          updatedMessages[messageIndex].sources = sources;
        }
        return updatedMessages;
      });
      
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
    } catch (error) {
      console.error("Error streaming data for user message: ",error)
    }finally{
      setDisabled(false)
    }
}
  return (
    <div className="relative min-h-full flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        {initialMessage && <div>
          <h1 className="flex justify-center mt-16 z-10 text-2xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600  text-center font-sans font-bold from-stone-400 to-stone-800">Hi There</h1> 
          <h1 className="text-center lg:mt-5 mt-3 text-lg lg:text-3xl font-bold dark:text-neutral-500 text-neutral-700"> <p className="align-start">Welcome back! <br />  How can I help you today?</p></h1>
        </div>}
        <div className="mb-32 mt-20">
        {messages.length>0 && messages.map((message,index) => (
          <div key={`message-${index}`} className="px-6 mt-4">
          {message.type === 'userMessage' && (
            <div key={`userMessage-${index}`} className="flex justify-end">
             <UserMessageComponent userMessage={message.userMessage}/> 
            </div>
          )}
            <div key={`llm-${index}`} className="mt-3 lg:flex justify-start">
             <LLMResponseComponent content={message.content}/>
            </div>
          <div className="mt-3">
            {/* @ts-ignore */}
            { <SourcesComponent sources={message.sources} />}
          </div>
          </div>
        
        ))}
        <div ref={scrollRef}></div>
        </div>
        <ChatInput  handleFormSubmit={handleFormSubmit} isDisabled={input.trim().length>0?false:true}/>
    </div>
  )
}

export default ChatComponent
