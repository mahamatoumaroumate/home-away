'use client'
import { Loader2Icon } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { SignInButton } from "@clerk/nextjs"
import { FaRegHeart } from "react-icons/fa"
type btnSize='default'|'lg'|'sm'
type SubmitButtonProps={
className?:string,
text?:string,
size?:btnSize
}
const SubmitButton = ({className,text='submit',size='lg'}:SubmitButtonProps) => {
const {pending}=useFormStatus()
  return (
    <Button className={`capitalize ${className}`} disabled={pending} type="submit" size={size}>
        {pending ? <>
           <Loader2Icon className="mr-2 h-4 w-4 animate-spin"/>please wait...</>:text}
    </Button>
  )
}
export default SubmitButton

export const CardSignInButton=()=>{
  return <SignInButton mode="modal" >
    <Button type="button" size='icon' variant='outline' className="p-2 cursor-pointer" asChild>
      <FaRegHeart/>
    </Button>
  </SignInButton>
}