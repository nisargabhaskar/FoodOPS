import Image from "next/image"
import Layout from "../components/layout"
import { useStore } from "../store/store"
import css from "../styles/Cart.module.css"
import { urlFor } from "../lib/client"
import toast,{Toaster} from "react-hot-toast"
import { useState } from "react"
import OrderModal from "../components/ordermodal"
import {useRouter} from "next/router"

export default function Cart() {
    const CartData = useStore((state)=>state.cart)
    const removeFooditem = useStore((state) =>state.removeFooditem)
    const [PaymentMethod, setPaymentMethod] = useState(null)
    const [Order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem("order")
    )
    const handleRemove = (i) => {
        removeFooditem(i);
        toast.error('Item Removed')
    };
    const router = useRouter()
    const total = () => CartData.fooditems.reduce((a,b)=>a+(b.quantity*b.price),0);
    const handleCOD = () => {
        setPaymentMethod(0);
        typeof window !== 'undefined' && localStorage.setItem('total',total())
    }
    const handleCheckout = async () =>{
        typeof window !== 'undefined' && localStorage.setItem('total',total())
        setPaymentMethod(1);
        const response = await fetch('/api/stripe',{
            method: "POST",
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(CartData.fooditems),
        });
        if(response.status === 500) return;
        const data = await response.json();
        toast.loading("Redirecting...");
        router.push(data.url)
    }
    return(
        <Layout>
            <div className={css.container}>
                {/* details */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Food Item</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>
                        <tbody className={css.tbody}>
                            {CartData.fooditems.length > 0 &&
                            CartData.fooditems.map((fooditem,i)=>{
                                const src = urlFor(fooditem.image).url();
                                return(
                                <tr key={i}>
                                    <td className={css.imageTd}>
                                        <Image
                                        loader = {() => src}
                                        src={src} alt="food item image"
                                        objectFit="cover" width={85} height={85} />
                                    </td>
                                    <td>{fooditem.name}</td>
                                    <td>
                                        {fooditem.size===0 ? "Small" : fooditem.size===1 ? "Medium" : "Large"}
                                    </td>
                                    <td>{fooditem.price}</td>
                                    <td>{fooditem.quantity}</td>
                                    <td>{fooditem.price*fooditem.quantity}</td>
                                    <td style={{
                                        color : "var(--themeRed)",
                                        cursor : "pointer",
                                        fontWeight : "bolder",
                                        fontSize :"0.8 rem"
                                    }} onClick={()=>handleRemove(i)}>X</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                {/* summary */}

                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{CartData.fooditems.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>₹{total()}</span>
                        </div>
                    </div>
                    {!Order && CartData.fooditems.length > 0 ? (
                        <div className={css.buttons}>
                            <button className="btn" onClick={handleCOD}>Cash On Delivery</button>
                            <button className="btn" onClick={handleCheckout}>Pay Now</button>
                        </div>
                    ):null}
                    
                </div>
            </div>
            <Toaster/>
            {/* modal for cod  */}
            <OrderModal
            opened = {PaymentMethod === 0}
            setOpened = {setPaymentMethod}
            PaymentMethod = {PaymentMethod}/>
        </Layout>
    )
};