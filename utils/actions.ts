'use server'
import { currentUser } from "@clerk/nextjs/server"
import prisma from "./db"
import { redirect } from "next/navigation"
import { imageSchema, profileSchema, propertySchema, validateWithZodSchema } from "./schemas"
import { revalidatePath } from "next/cache"
import { deleteFileFromS3, uploadFileToS3 } from "./neon"


const getAuthUser=async()=>{
    const user=await currentUser()
    if(!user) return null
    if(!user?.privateMetadata?.hasProfile)return redirect('/profile/create')
  return user
}

export const fetchProfileImage=async()=>{
    const user=await getAuthUser()
    if(!user) return null
    const profile=await prisma.profile.findUnique({
        where:{
            clerkId:user.id
        },select:{profileImage:true}
       
    })
    return profile?.profileImage
}
export const fetchProfile=async()=>{
    const user=await getAuthUser()
    if(!user) return null
    const profile=await prisma.profile.findUnique({
        where:{
            clerkId:user.id
        },
       
    })
    if(!profile) return redirect('/profile/create')
    return profile
}
export const updateProfileAction=async(prevState:any,formData:FormData):Promise<{message:string}>=>{
    
    const user=await getAuthUser()
    try {
        const rawData=Object.fromEntries(formData)
        const validatedFields=validateWithZodSchema(profileSchema,rawData)
        await prisma.profile.update({
            where:{
                clerkId:user?.id
            },
            data:validatedFields
        })
        revalidatePath('/profile')
        return {message:'Profile updated successfully'}

    } catch (error) {
        return {message:error instanceof Error ? error.message:'An error occurred'}
    }
}
export const updateImageProfileAction=async(prevState:any,formData:FormData):Promise<{message:string}>=>{
    
const user=await getAuthUser()
try {
    const image=formData.get('image') as File
    const validatedFields=validateWithZodSchema(imageSchema,{image})
    const fullPath=await uploadFileToS3(validatedFields.image)
    const oldFile=await prisma.profile.findUnique({ where:{ clerkId:user?.id},select:{ profileImage:true }})
await deleteFileFromS3(oldFile?.profileImage as string)
 await prisma.profile.update({where:{ clerkId:user?.id}, data:{  profileImage:fullPath}})
    revalidatePath('/profile')
    return {message:'Profile image updated successfully'}
} catch (error) {
    return {message:error instanceof Error ? error.message:'An error occurred'}

}
}

export const createPropertyAction=async(prevState:any,formData:FormData):Promise<{message:string}>=>{
    
    const user= await getAuthUser()
    if(!user) throw new Error('Please login in order to access this route')
    try {
       const rawData=Object.fromEntries(formData) 
       const file=formData.get('image') as File

       const validatedFields=validateWithZodSchema(propertySchema,rawData)
       const validatedFile=validateWithZodSchema(imageSchema,{image:file})
       const fullPath=await uploadFileToS3(validatedFile.image)
       await prisma.property.create({
        data:{
            ...validatedFields,
            image:fullPath,
            profileId:user.id 
        },
       })
       
    } catch (error) {
        return {message:error instanceof Error ? error.message:'An error occurred'}
    }
    redirect('/')
}

export const fetchProperties=async({search='',category}:{search?:string,category?:string})=>{
    const properties=await prisma.property.findMany({
        where:{
            category,
            OR:[
                {name:{contains:search,mode:'insensitive'}},{tagline:{contains:search,mode:'insensitive'}}
            ]
        },select:{
            id:true,
            name:true,
            tagline:true,
            country:true,
            image:true,
            price:true
        }
    })
    return properties
}

export const fetchFavoriteId=async({propertyId}:{propertyId:string})=>{
    const user=await getAuthUser()
    const favorite=await prisma.favorite.findFirst({
        where:{
            propertyId,
            profileId:user?.id
        },
        select:{
            id:true
        }
    })
    return favorite?.id||null
}
export const toggleFavoriteAction=async(prevState:{ propertyId:string,
        favoriteId:string|null,
        pathname:string})=>{
    const user=await getAuthUser()
    if(!user) throw new Error('please login in order to add to favorite')
    const {propertyId,favoriteId,pathname}=prevState
    try {
        if(favoriteId){
            await prisma.favorite.delete({
                where:{
                    id:favoriteId
                }
            })
        }else{
            await prisma.favorite.create({
                data:{
                    propertyId,
                    profileId:user?.id
                  
                }
            })
        }
        revalidatePath(pathname)
        return {message:favoriteId?'Removed from Faves':'Added to Faves'}
    } catch (error) {
        
        return {message:error instanceof Error ? error.message:'An error occurred'}
    }
}

export const fetchFavorites=async()=>{
    const user=await getAuthUser()
    const favorites=await prisma.favorite.findMany({
        where:{
            profileId:user?.id
        },
        select:{
            property:{
                select:{
                    id:true,
                    name:true,
                    tagline:true,
                    price:true,
                    country:true,
                    image:true
                }
            }
        }
    })
    return favorites.map((favorite)=>favorite.property)
}

export const fetchPropertyDetails=(id:string)=>{
    return prisma.property.findUnique({
        where:{
            id,
        },
        include:{
            profile:true
        },
    })
}