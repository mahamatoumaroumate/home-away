import {User2} from 'lucide-react'
import { fetchProfileImage } from '@/utils/actions'
const UserIcon =async () => {
  const profileImage=await fetchProfileImage()
  if(profileImage){
    return <img src={profileImage} className='w-6 h-6 rounded-full object-cover'/>
  }
  return (
    <User2 className='w-6 h-6 bg-primary rounded-full text-white'>UserIcon</User2>
  )
}
export default UserIcon
