"use client"

import { ThemeProvider } from '@/components/theme-provider'
import { RecoilRoot } from 'recoil'

import { SessionProvider } from "next-auth/react" 

export function Providers({children}: {children:React.ReactNode}){
    return(
    <SessionProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </ThemeProvider>
    </SessionProvider>
    )
}
