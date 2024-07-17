import Image from "next/image";
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import LinksRenderer from "@/components/LinksRenderer";

export default async function Home() {
  // const url = "https://js.langchain.com/v0.2/docs";

  // const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;

  // const loader = new RecursiveUrlLoader(url, {
  //   extractor: compiledConvert,
  //   maxDepth: 100,
    
  // });

  // const docs = await loader.load();
  // console.log(docs)
  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
    <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
      {/* left side docs renderer */}
      <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <LinksRenderer/>
          </div>
      </div>

      <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l h-screen overflow-y-scroll lg:border-t-0">
          {/* <ChatWrapper name={"session.user.name"} linksId={link.id} fileId={""}/> */}
      </div>
    </div>
  </div>
  );
}
