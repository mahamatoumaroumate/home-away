import LoadingCards from "@/components/Card/LoadingCards";
import CategoriesList from "@/components/Home/CategoriesList";
import PropertiesContainer from "@/components/Home/PropertiesContainer";
import { Suspense } from "react";

export default function Home({searchParams}:{searchParams:{category?:string,search?:string}}) {
  
  return (
   <section>
   <CategoriesList category={searchParams.category} search={searchParams.search}/>
<Suspense fallback={<LoadingCards/>}>
<PropertiesContainer category={searchParams.category} search={searchParams.search}/>
</Suspense>
   </section>
  );
}
