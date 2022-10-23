import css from "../styles/Menu.module.css"
import Image from "next/image"
import { urlFor } from "../lib/client"
import Link from "next/link"
export default function Menu({fooditems}) {
    // console.log(fooditems);
    return(
        <div className={css.container}>
            {/* actual menu */}
            <div className={css.menu}>
                {fooditems.map((fooditem,id)=>{
                    const src = urlFor(fooditem.image).url()
                    return(
                        <div className={css.fooditem} key={id}>
                            <Link href={`./${fooditem._type}/${fooditem.slug.current}`}>
                            <div className={css.ImageWrapper}>
                                <Image 
                                loader = {() => src}
                                src={src} alt="food item image"
                                objectFit="cover" layout="fill"/>
                            </div>
                            </Link>
                            <span>{fooditem.name}</span>
                            <span>₹{fooditem.price[0]}</span>
                        </div>  
                    )
                })}
            </div>
        </div>
    )
}