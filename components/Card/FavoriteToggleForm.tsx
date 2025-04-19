'use client'

import {  toggleFavoriteAction } from "@/utils/actions"
import { usePathname } from "next/navigation"
import FormContainer from "../Form/FormContainer"
import CardSubmitButton from "./CardSubmitButton"

const FavoriteToggleForm = async({propertyId,favoriteId}:{propertyId:string,favoriteId:string |null}) => {
const pathname=usePathname()
const toggleAction=toggleFavoriteAction.bind(null,{
  propertyId,
  favoriteId,
  pathname
})
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ?true:false}/> 
    </FormContainer>
  )
}
export default FavoriteToggleForm