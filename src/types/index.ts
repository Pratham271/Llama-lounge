export interface Message {
    id: number;
    type: string;
    content: string;
    userMessage: string;
    isStreaming: boolean;
    sources?: Sources[];
}
  
export interface Sources{
    content:string,
    pageNumber: number
}
  
export interface StreamMessage {
    userMessage?: string;
    llmResponse?: string;
    llmResponseEnd?: boolean;
}