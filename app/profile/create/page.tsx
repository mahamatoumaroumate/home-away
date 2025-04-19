'use server'

import SubmitButton from "@/components/Form/Buttons";
import FormContainer from "@/components/Form/FormContainer";
import FormInput from "@/components/Form/FormInput";
import { profileSchema } from "@/utils/schemas";
import  prisma  from "@/utils/db";
import {  currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { redirect } from "next/navigation";

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });
await clerkClient.users.updateUserMetadata(user.id,{
  privateMetadata:{
    hasProfile:true
  }
})
  } catch (error) {
    console.error(error);
    return { message: error instanceof Error ? error.message : "An error occurred" };
  }
  redirect('/')
};

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
