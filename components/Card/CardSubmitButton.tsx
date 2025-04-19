import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { TbReload } from "react-icons/tb"
const CardSubmitButton = ({isFavorite}:{isFavorite:boolean}) => {
    const {pending}=useFormStatus()

  return (
    <Button type="submit" size='icon' variant='outline' className='p-2 cursor-pointer'>
        {pending?(<TbReload className="animate-spin"/>):isFavorite?<FaHeart/>:<FaRegHeart/>}
    </Button>
  )
}
export default CardSubmitButton