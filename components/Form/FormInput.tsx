import { Input } from "../ui/input"
import { Label } from "../ui/label"

type FormInputProps={
    name:string,
    type:string,
    label?:string,
    defaultValue?:string,
    placeholder?:string
}
const FormInput = ({label,name,type,defaultValue,placeholder}:FormInputProps) => {
  return (
    <div className="mb-2">
        <Label htmlFor={name} className="capitalize">{label||name}</Label>
        <Input id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required />
    </div>
  )
}
export default FormInput