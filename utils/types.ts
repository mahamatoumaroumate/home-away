export type actionFunction=(prevState:any,
    formData:FormData)=>Promise<{message:string}>

export type PropertyCardProps={
    id:string ,
    name:string,
    tagline:string,
    image :string,
    country:string,
    price:number,
    
}
