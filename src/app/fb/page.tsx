
import LinksRenderer from "@/components/LinksRenderer";
import ChatWrapper from "@/components/chat/ChatWrapper";
import { generateWebsiteVectorStore } from "@/actions/vectorStore";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const maxDuration = 60;
export default async function Home() {
  // const id = await generateWebsiteVectorStore()
  // console.log(id)
  const session = await getServerSession(authOptions)
  if(!session?.user){
    redirect("/signin")
  }
  return (
    <div className='flex justify-between  flex-col h-[calc(100vh-3.5rem)]'>
    <ChatWrapper/>
  </div>
  );
}
