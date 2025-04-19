import CounterInput from "@/components/Accomodation/CounterInput"
import AmenitiesInput from "@/components/Form/AmenitiesInput"
import SubmitButton from "@/components/Form/Buttons"
import CategoriesInput from "@/components/Form/CategoriesInput"
import CountriesInput from "@/components/Form/CountriesInput"
import FormContainer from "@/components/Form/FormContainer"
import FormInput from "@/components/Form/FormInput"
import ImageInput from "@/components/Form/ImageInput"
import PriceInput from "@/components/Form/PriceInput"
import TextAreaInput from "@/components/Form/TextAreaInput"
import { createPropertyAction } from "@/utils/actions"

const CreateProperty = () => {
  return (
    <section>
        <h1 className="text-2xl font-semibold mb-8 capitalize">
            create property
        </h1>
        <div className="border p-8 rounded-md">
            <h3 className="text-lg mb-4 font-medium">
                General Info
            </h3>
            <FormContainer action={createPropertyAction}>
              <div className="grid md:grid-cols-2 gap-8 mb-4">
                <FormInput name="name" type="text" label="Name (20 limit)" defaultValue="Cabin in Latvia"/>
                <FormInput name="tagline" type="text" label="Tagline (30 limit)" defaultValue="Dream Getaway Awaits You Here!"/>
               <PriceInput/>
                <CategoriesInput/>
              </div>
              <TextAreaInput name="description" labelText="Description (10 - 1000 Words)"/>
              <div className='grid sm:grid-cols-2 gap-8 mt-4'>
            <CountriesInput />
            <ImageInput />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="guests"/>
          <CounterInput detail="bedrooms"/>
          <CounterInput detail="beds"/>
          <CounterInput detail="baths"/>
        <h3 className="text-lg mt-10 mb-6 font-medium">
          Amenities
        </h3>
        <AmenitiesInput/>
                <SubmitButton text="create rental" className="mt-12"/>
               
            </FormContainer>
        </div>
    </section>
  )
}
export default CreateProperty