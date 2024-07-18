"use server"
import prisma from "@/db"

export default async function logout(name:string){
    await prisma.user.update({
        where: {
            username: name
        },
        data: {
            token: ""
        }
    })
}