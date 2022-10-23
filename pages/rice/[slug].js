import Image from "next/image";
import Layout from "../../components/layout"
import { client } from "../../lib/client"
import css from "../../styles/Fooditem.module.css"
import { urlFor } from "../../lib/client";
import LeftArrow from "../../assets/arrowLeft.png"
import RightArrow from "../../assets/arrowRight.png"
import { useState } from "react";
import { useStore } from "../../store/store";
import { toast,Toaster } from "react-hot-toast";

export default function Rice({rice}) {
    // console.log(rice);
    const src = urlFor(rice.image).url()
    const [Size, setSize] = useState(0)
    const [Quantity, setQuantity] = useState(1)
    const addRice = useStore((state)=>state.addFooditem)
    const addToCart = ()=>{
        addRice({...rice,price: rice.price[Size],quantity: Quantity,size: Size})
        // console.log("rice added")
        toast.success("Added to Cart")
    }

    return (
        <Layout>
            <div className={css.container}>
               <div className={css.ImageWrapper}>
               <Image 
                    loader = {() => src}
                    src={src} alt="rice image" unoptimized
                    objectFit="cover" layout="fill"/>
                </div> 
                {/* right side */}
                <div className={css.right}>
                    <span>{rice.name}</span>
                    <span>{rice.details}</span>
                    <span>₹{rice.price[Size]* Quantity}</span>
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div onClick={()=>setSize(0)} className={Size=== 0 ? css.selected : ""}>Small</div>
                            <div onClick={()=>setSize(1)} className={Size=== 1 ? css.selected : ""}>Medium</div>
                            <div onClick={()=>setSize(2)} className={Size=== 2 ? css.selected : ""}>Large</div>
                        </div>
                    </div>
                    {/* Quantity counter */}
                    <div className={css.quantity}>
                        <span>Quantity</span>
                        <div className={css.counter}>
                            <Image src={LeftArrow} height={20} width={20} alt="left arrow " objectFit="contain" onClick={()=>{Quantity=== 0 ? Quantity : setQuantity(Quantity-1)}}/>
                            <span>{Quantity}</span>
                            <Image src={RightArrow} height={20} width={20} alt="Right arrow " objectFit="contain" onClick={()=>setQuantity(Quantity+1)}/>
                        </div>
                    </div>
                    {/* add to cart button */}
                    <div className={`btn $(css.btn)`} onClick={addToCart}>
                        Add to Cart
                    </div>
                </div>
                <Toaster/>
            </div>
        </Layout>
    )
};

export async function getStaticPaths(){
    const ricepaths = await client.fetch(
        `*[_type=="rice" && defined(slug.current)][].slug.current`   
    );

    return{
        paths: ricepaths.map((slug)=> ({params :{slug} })),
        fallback : "blocking",
    };
}

export async function getStaticProps(context){
    const {slug = ""} = context.params;
    const rice = await client.fetch(
        `*[_type=="rice" && slug.current== '${slug}'][0]`
    );
    return{
        props: {
            rice
        }
    };
}