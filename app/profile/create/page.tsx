import SubmitButton from "@/components/Form/Buttons"
import FormContainer from "@/components/Form/FormContainer"
import FormInput from "@/components/Form/FormInput"
import { createProfileAction } from "@/utils/actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"




const CreateProfile = async() => {
  const user=await currentUser()
  if(user?.privateMetadata?.hasProfile) redirect('/')
  return (
    <section >
<h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>
<div className="border p-8 rounded-md max-w-lg">
    <FormContainer action={createProfileAction}>
        <div className="grid gap-4 mt-4">
           <FormInput type="text" name="firstName" label="first Name"/>
           <FormInput type="text" name="lastName" label="last Name"/>
           <FormInput type="text" name="username" label="user Name"/>
        </div>
        <SubmitButton text="Create Profile" className="mt-8"/>
       
    </FormContainer>
</div>
    </section>
  )
}
export default CreateProfile
