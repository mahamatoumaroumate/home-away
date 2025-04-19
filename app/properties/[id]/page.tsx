import FavoriteToggleButton from "@/components/Card/FavoriteToggleButton"
import PropertyRating from "@/components/Card/PropertyRating"
import Amenities from "@/components/Properties/Amenities"
import BookingCalendar from "@/components/Properties/Booking/BookingCalendar"
import BreadCrumbs from "@/components/Properties/BreadCrumbs"
import Description from "@/components/Properties/Description"
import ImageContainer from "@/components/Properties/ImageContainer"
import PropertyDetails from "@/components/Properties/PropertyDetails"
import ShareButton from "@/components/Properties/ShareButton"
import UserInfo from "@/components/Properties/UserInfo"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPropertyDetails } from "@/utils/actions"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
const DynamicMap=dynamic(
  ()=>import ('@/components/Properties/PropertyMap'),
  {
    ssr:false,
    loading:()=><Skeleton className="h-[400px] w-full"/>
  }
)
const PropertyDetailsPage = async({params}:{params:{id:string}}) => {
const property=await fetchPropertyDetails(params.id)
if(!property) redirect('/')
const {bedrooms,baths,guests,beds}=property
const details={bedrooms,baths,guests,beds}
const firstName=property.profile.firstName
const profileImage=property.profile.profileImage
  return (
    <section>
        <BreadCrumbs name={property.name}/>
        <header className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-bold">
                {property.tagline}
            </h1>
            <div className="flex items-center gap-x-4">
                <ShareButton name={property.name} propertyId={property.id}/>
                <FavoriteToggleButton propertyId={property.id}/>
            </div>
        </header>
        <ImageContainer mainImage={property.image} name={property.name}/>
        <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
          <div className="lg:col-span-8">
            <div className="flex gap-x-4 items-center">
              <h1 className="text-xl font-bold">{property.name}</h1>
              <PropertyRating inPage propertyId={property.id}/>
            </div>
            <PropertyDetails details={details}/>
        <UserInfo profile={{firstName,profileImage}}/>
        <Separator className="mt-4"/>
        <Description description={property.description}/>
        <Amenities amenities={property.amenities}/>
        <DynamicMap countryCode={property.country} />
          </div>
          <div className="lg:col-span-4 flex flex-col items-center">
            <BookingCalendar/>
          </div>
        
        </section>
    </section>
  )
}
export default PropertyDetailsPage