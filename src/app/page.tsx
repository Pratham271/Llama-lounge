import Image from "next/image";
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";

export default async function Home() {
  const url = "https://js.langchain.com/v0.2/docs";

  const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;

  const loader = new RecursiveUrlLoader(url, {
    extractor: compiledConvert,
    maxDepth: 100,
    
  });

  const docs = await loader.load();
  console.log(docs)
  return (
    <div>

    </div>
  );
}
