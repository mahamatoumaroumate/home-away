import EmptyList from "@/components/Home/EmptyList"
import PropertiesList from "@/components/Home/PropertiesList"
import { fetchFavorites } from "@/utils/actions"

const FavoritesPage = async() => {
  const favorites=await fetchFavorites()
  if(favorites.length===0){
    return <EmptyList btnText="Clear Filters"/>
  }
  return (
    <PropertiesList properties={favorites}/>
  )
}
export default FavoritesPage