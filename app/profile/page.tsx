
import SubmitButton from "@/components/Form/Buttons"
import FormContainer from "@/components/Form/FormContainer"
import FormInput from "@/components/Form/FormInput"
import ImageInputContainer from "@/components/Form/ImageInputContainer"
import { fetchProfile, updateImageProfileAction, updateProfileAction } from "@/utils/actions"
import { redirect } from "next/navigation"

const ProfilePage = async() => {
  const profile=await fetchProfile()
if(!profile)redirect('/')
  return (
    <section >
      <h1 className="border p-8 rounded-md">user profile</h1>
      <div className="border p-8 rounded-md">
    <ImageInputContainer image={profile.profileImage} name={profile.username} action={updateImageProfileAction} text='Update Profile Image'/>
        <FormContainer action={updateProfileAction}>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <FormInput type="text" name="firstName" label="First Name" defaultValue={profile.firstName}/>
            <FormInput type="text" name="lastName" label="Last Name" defaultValue={profile.lastName}/>
            <FormInput type="text" name="username" label="User Name" defaultValue={profile.username}/>
          </div>
          <SubmitButton text="Update Profile" className="mt-8"/>
        </FormContainer>
      </div>
    </section>
  )
}
export default ProfilePage

