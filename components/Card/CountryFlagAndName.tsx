import { findCountryByCode } from "@/utils/countries"

const CountryFlagAndName = ({countryCode}:{countryCode:string}) => {
  const validCountry=findCountryByCode(countryCode)
  const countryName=validCountry!.name.length>20?`${validCountry!.name.substring(0,20)}...`:validCountry!.name
  return (
    <span className="flex justify-center items-center gap-2 text-sm">
      {validCountry?.flag} {countryName}
    </span >

  )
}
export default CountryFlagAndName