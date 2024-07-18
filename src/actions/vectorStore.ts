"use server"
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { CloseVectorNode } from "@langchain/community/vectorstores/closevector/node";
import { embeddings } from "@/constants/embeddings";

const url = "https://developers.facebook.com/docs/marketing-apis";

export async function generateWebsiteVectorStore(){
    try {
        const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;
        console.log("loading")
        const loader = new RecursiveUrlLoader(url, {
            extractor: compiledConvert,
            maxDepth: 100,
        });

        const docs = await loader.load();  

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const splitDocs = await textSplitter.splitDocuments(docs);
        
        console.log(splitDocs)
        console.log("done with split docs creating vector store now")
        const closeVectorStore = CloseVectorNode.fromDocuments(
            splitDocs,
            embeddings
        )
        console.log(closeVectorStore)
        console.log("done with vector store uploading to cloud")
        const res = (await closeVectorStore).saveToCloud({
            description: "example",
            public: true,
            credentials: {
                key: process.env.VOYAGE_LINKS_ACCESS_KEY,
                secret: process.env.VOYAGE_LINKS_SECRET
            }
        })
        console.log("response: ",await res)
        const { uuid } = (await closeVectorStore).instance;
        console.log("uuid: ", uuid)
        
 
        return uuid
    } catch (error:any) {
        console.log(error)
        return error.message 
    }
}