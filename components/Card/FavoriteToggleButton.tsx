
import { CardSignInButton } from "../Form/Buttons"
import { fetchFavoriteId } from "@/utils/actions"
import { auth } from "@clerk/nextjs/server"
import FavoriteToggleForm from "./FavoriteToggleForm"

const FavoriteToggleButton = async({propertyId}:{propertyId:string}) => {
  const {userId}= await auth()
  if(!userId) return <CardSignInButton/>
const favoriteId=await fetchFavoriteId({propertyId})
  return (
    <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId}/>
  )
}
export default FavoriteToggleButton