import Image from "next/image";
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import LinksRenderer from "@/components/LinksRenderer";
import ChatWrapper from "@/components/chat/ChatWrapper";
import { generateWebsiteVectorStore } from "@/actions/vectorStore";

export default async function Home() {
  // const id = await generateWebsiteVectorStore()
  // console.log(id)
  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
    <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
      {/* left side links renderer */}
      <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <LinksRenderer/>
          </div>
      </div>

      <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l h-screen overflow-y-scroll lg:border-t-0">
          <ChatWrapper/>
      </div>
    </div>
  </div>
  );
}
