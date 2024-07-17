'use client';
import React, { useEffect, useRef, useState } from 'react'
// import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
// import { loadingAtom } from '../../store/atoms/loading'
// import Spinner from '../ui/spinner'
// import { initialMessageAtom, inputAtom, inputBoxDisabledAtom } from '../../store/atoms/input'
// import ChatForm from './ChatForm'
// import { type AI } from '../../actions/chat';
// import { readStreamableValue, useActions } from "ai/rsc";

import UserMessageComponent from './UserMessageComponent'
// import getSources from '../../actions/sources'
import SourcesComponent from './SourcesComponent'
// import { Message, StreamMessage } from '../../types/types'
import { Link1Icon } from '@radix-ui/react-icons'
// import { typeAtom } from '../../store/atoms/types';
import LLMResponseComponent from './LLMResponseComponent';


const ChatComponent = ({name,heading}:{name:string,heading:{res:boolean, docType: string | null | undefined}}) => {
   // set up actions that will be used to stream all the messages  
//   const {myAction} = useActions<typeof AI>();
//   const loading = useRecoilValue(loadingAtom)
//   const [messages, SetMessages] = useState<Message[]>([]);
//   const [input,setInput] = useRecoilState(inputAtom)
//   const [initialMessage,setInitialMessage] = useRecoilState(initialMessageAtom)

//   const scrollRef = useRef<HTMLDivElement | null>(null)
  
//   // const heading= useRecoilValue(headingAtom)
//   const setDisabled = useSetRecoilState(inputBoxDisabledAtom)
//   const [type, setType] = useRecoilState(typeAtom)
//   // state for displaying the current llm response while streaming
//   useEffect(()=> {
   
//    if(messages.length>1 && scrollRef.current){
//       scrollRef.current.scrollIntoView()
//    }
  
// },[messages])

// const handleNewFile = () => {
//   SetMessages([])
// }

// useEffect(()=> {
//   if(heading.docType){
//     setType(heading.docType)
//   }
// },[])

// const handleKeyPress = async (event:React.KeyboardEvent<HTMLInputElement>) => {
//   if(event.key==='Enter'  && !event.shiftKey){
//     const messageToSend = input.trim();
//     setInput('')
//   if(!messageToSend) return;
//   await handleUserMessageSubmission(messageToSend)
//   }
// }

// const handleFormSubmit = async() => {
//   const messageToSend = input.trim();
//   setInput('')
//   setInitialMessage(false)
//   if(!messageToSend) return;
//   await handleUserMessageSubmission(messageToSend)
// }

// const handleUserMessageSubmission = async(userMessage:string) => {
//   if(!userMessage) return;
//   setInitialMessage(false)
//     const newMessageId = Date.now()
//     const newMessage = {
//       id: newMessageId,
//       type: 'userMessage',
//       userMessage: userMessage,
//       content: '',
//       isStreaming: true,
//       sources: [],
//     };
//     SetMessages(prevMessage =>[...prevMessage, newMessage]);
//     setDisabled(true)
//     let lastAppendResponse = "";
//     try {
      
//       const streamableValue = await myAction(userMessage,messages,type);
//       for await(const message of readStreamableValue(streamableValue)){
//         const typedMessage = message as StreamMessage
//         SetMessages((prevMessages) => {
//           const messagesCopy = [...prevMessages]
//           const messageIndex = messagesCopy.findIndex(msg => msg.id === newMessageId)
//           if(messageIndex!==-1){
//             const currentMessage = messagesCopy[messageIndex]
//             if(typedMessage.llmResponse && typedMessage.llmResponse !== lastAppendResponse){
//               currentMessage.content += typedMessage.llmResponse;
//               lastAppendResponse = typedMessage.llmResponse
//             }
//             if(typedMessage.llmResponseEnd){
//               currentMessage.isStreaming = false;
//             }
//           }
//           return messagesCopy
//         })
        
//       }

      
//       try {
//     //   const sources = await getSources(userMessage);
//       SetMessages((prevMessages) => {
//         const updatedMessages = [...prevMessages];
//         const messageIndex = updatedMessages.findIndex(msg => msg.id === newMessageId);
//         if (messageIndex !== -1) {
//           // @ts-ignore
//           updatedMessages[messageIndex].sources = sources;
//         }
//         return updatedMessages;
//       });
      
//     } catch (error) {
//       console.error("Error fetching sources:", error);
//     }
//     } catch (error) {
//       console.error("Error streaming data for user message: ",error)
//     }finally{
//       setDisabled(false)
//     }
// }
  return (
    // <div >
    //     {loading && <div className="flex flex-col"><div className="flex flex-col justify-center pt-96"><Spinner/></div> <span className="text-center text-sm">Getting things ready for you...</span></div>}
    //     {initialMessage && <div>
    //       <h1 className="flex justify-center mt-16 z-10 text-2xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600  text-center font-sans font-bold from-stone-400 to-stone-800">Hello {name}</h1> 
    //       <h1 className='text-center lg:mt-5 mt-3 text-lg lg:text-3xl font-bold dark:text-neutral-500 text-neutral-700'>{heading.res? <p className='align-start'>Welcome back! <br />  How can I help you today?</p>:<p className='flex justify-center '>Good to see you <br /> Get started by clicking on <span className='flex items-center leading-none justify-center lg:pt-10 pt-7 lg:pl-3 pl-2'><Link1Icon height={20} width={20}/></span> </p>}</h1>
    //     </div>}
    //     <div className='mb-32 mt-20'>
    //     {messages.length>0 && messages.map((message,index) => (
    //       <div key={`message-${index}`} className='px-6 mt-4'>
    //       {message.type === 'userMessage' && (
    //         <div key={`userMessage-${index}`} className='flex justify-end'>
    //          <UserMessageComponent message={message.userMessage}/> 
    //         </div>
    //       )}
    //         <div key={`llm-${index}`} className='mt-3 lg:flex justify-start'>
    //          <LLMResponseComponent llmResponse={message.content}/>
    //         </div>
    //       <div className='mt-3'>
    //         {/* @ts-ignore */}
    //         { <SourcesComponent sources={message.sources} />}
    //       </div>
    //       </div>
        
    //     ))}
    //     <div ref={scrollRef}></div>
    //     </div>
    //     <ChatForm handleKeyPress={handleKeyPress} handleFormSubmit={handleFormSubmit} handleNewFile={handleNewFile} response={heading.res}/>
    // </div>
    <div>
        
    </div>
  )
}

export default ChatComponent
