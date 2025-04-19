'use client'

import { actionFunction } from "@/utils/types"
import { LucideUser2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"
import FormContainer from "./FormContainer"
import ImageInput from "./ImageInput"
import SubmitButton from "./Buttons"

type ImageInputContainerProps={
    image:string,
    name:string,
    action:actionFunction,
    text:string,
    children?:React.ReactNode
}
const ImageInputContainer = (props:ImageInputContainerProps) => {
    const {image,name,action,text}=props
    const [isUpdateFormVisible,setUpdateFormVisible]=useState(false)
     const userIcon=(
        <LucideUser2 className="w-24 h-24 bg-primary rounded-md text-white mb-4"/>
     )
  return (
    <div>
        {image ?<Image src={image} width={100} height={100} className="rounded-md object-cover w-24 max-h-24" alt={name}/>:(userIcon)}
        <Button variant='outline' size='sm' onClick={()=>setUpdateFormVisible((prev)=>!prev)}>
            {text}
        </Button>
        {isUpdateFormVisible && (
            <div className="max-w-lg mt-4">
                <FormContainer action={action}>
                    {props.children}
                    <ImageInput/>
                    <SubmitButton size="sm"/>
                </FormContainer>
            </div>
        )}
    </div>
  )
}
export default ImageInputContainer