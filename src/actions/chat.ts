import OpenAI from 'openai';
import { createAI, createStreamableValue } from "ai/rsc";
import { embeddings } from '@/constants/embeddings';
import { CloseVectorNode } from '@langchain/community/vectorstores/closevector/node';
import { Message } from '@/types';



let openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function myAction(userMessage: string, prevMessages: Message[] ,model:string): Promise<any> {
    "use server"

    const streamable = createStreamableValue({});

    (async () => {
        const startTime = new Date();
        const loadedVectorStore = await CloseVectorNode.loadFromCloud({
            uuid: process.env.NEXT_VECTOR_STORE_UUID || "",
            embeddings,
            credentials: {
                key: process.env.VOYAGE_LINKS_ACCESS_KEY,
                secret: process.env.VOYAGE_LINKS_SECRET,
            },
        });
        const endTime = new Date();
        const elapsedTime = endTime.getTime() - startTime.getTime(); // Time difference in milliseconds

        console.log(`Loading took ${elapsedTime} milliseconds.`);
        const formattedPrevMessages = prevMessages ? prevMessages.map((msg) => ({
            role: msg.type,
            content: msg.content,
            userMessage: msg.userMessage
          })) : [];

        const results = await loadedVectorStore.similaritySearch(userMessage, 4);
        // console.log(results)
        
        const chatCompletion = await openai.chat.completions.create({
            
            messages: 
            [{
                role: "system",
                content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.`
            },
            {
                role: "user",
                content: `You are a helpful AI assistant. Use the following pieces of context (or previous conversaton if needed) to answer the question at the end.
                If you don't know the answer, just say you don't know. DO NOT try to make up an answer. DO NOT give the answer if it is not related to the context
                If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
    
                \n----------------\n
              
                PREVIOUS CONVERSATION:
              ${formattedPrevMessages.map((message) => {
                  if (message.role === "user") return `User: ${message.content}\n`;
                  return `Assistant: ${message.content}\n`;
                })}
                    
                \n----------------\n
                CONTEXT:
              ${results.map((r: CloseVectorNode | any) => r.pageContent).join("\n\n")}
              
              USER INPUT: ${userMessage}`,
              
            },
            
        ],
        stream: true,
        model: model?model:"gpt-3.5-turbo",

        })
        console.log("chats",chatCompletion)
        for await(const chunk of chatCompletion){
            if(chunk.choices[0].delta && chunk.choices[0].finish_reason!== "stop"){
                streamable.update({ 'llmResponse': chunk.choices[0].delta.content });
            }else if(chunk.choices[0].finish_reason=== "stop"){
                streamable.update({ 'llmResponseEnd ': true})
            }
        }
        // not sure about this
        // streamable.update({ 'generateImageComponent' : ['Generate image 1', 'Generate image 2'] });
        // if we don't call the done and only updates eventually it will throw the error
        streamable.done({ status: 'done' });
    
    })();
    return streamable.value;
}
const initialAIState: {
    role: 'user' | 'assistant' | 'system' | 'function';
    content: string;
    id?: string;
    name?: string;
  }[] = [];
  const initialUIState: {
    id: number;
    display: React.ReactNode;
  }[] = [];
  //  Export the AI instance
  export const AI = createAI({
    actions: {
      myAction
    },
    initialUIState,
    initialAIState,
});