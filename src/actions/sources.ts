"use server"

import { embeddings } from "../constants/embeddings";
import { CloseVectorNode } from "@langchain/community/vectorstores/closevector/node";

export default async function getSources(userMessage:string){
    console.log("Inside getSources")

    const loadedVectorStore = await CloseVectorNode.loadFromCloud({
        uuid: process.env.NEXT_VECTOR_STORE_UUID || "",
        embeddings,
        credentials: {
            key: process.env.VOYAGE_LINKS_ACCESS_KEY,
            secret: process.env.VOYAGE_LINKS_SECRET,
        },
    });
    try {
        const results = await loadedVectorStore.similaritySearch(userMessage, 4);
        console.log("sources: ",results)
        console.log("loc: ",results[0].metadata.loc)
        let sources: { title: string, source: string }[] = [];
        
        results.map((c,index) => {
        if(c.metadata.pageNumber!==null && c.pageContent.trim().length>0){
          if (!sources[index]) {
            sources[index] = { title: "", source: "" };
        }
         
            sources[index].title = c.metadata.title
            sources[index].source = c.metadata.source
          }
        })
        return sources
    } catch (error) {
        console.log(error)
        return error
    }
    
    
}