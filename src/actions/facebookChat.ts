import { embeddings } from "@/constants/embeddings";
import { ChatOpenAI } from "@langchain/openai";
import { WebBrowser } from "langchain/tools/webbrowser";

export async function getfbChat(userMessage:string){
    const model = new ChatOpenAI({ temperature: 0 });
    const browser = new WebBrowser({ model, embeddings });
    const result = await browser.invoke(
        `"https://developers.facebook.com/docs/marketing-api/best-practices",${userMessage}`
    );
}