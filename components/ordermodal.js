import { Modal,useMantineTheme } from "@mantine/core";
import { createOrder } from '../lib/orderhandler'
import { useState } from "react";
import css from "../styles/OrderModal.module.css"
import toast,{Toaster} from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function OrderModal({opened,setOpened,PaymentMethod}) {
    const theme = useMantineTheme();
    const router = useRouter();
    const total = typeof window !== 'undefined' && localStorage.getItem('total')
    const [FormData, setFormData] = useState({})
    const handleInput = (e)=>{
        setFormData({...FormData,[e.target.name]:e.target.value})
    }
    const resetCart = useStore((state)=>state.resetCart)
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const id = await createOrder({...FormData,total,PaymentMethod});
        toast.success("Order Placed");
        resetCart();
        {
          typeof window !== 'undefined' && localStorage.setItem('order',id)
        }
        router.push(`/order/${id}`)
    }
    return (
        <Modal
          overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
          overlayOpacity={0.55}
          overlayBlur={3}
          opened = {opened}
          onClose = {()=>{setOpened(null);}}
        >
          {/* Modal content */}
            <form onSubmit={handleSubmit} className={css.formcontainer}>
                <input onChange={handleInput} type="text" name="name" required placeholder = "Name"/>
                <input onChange={handleInput} type="text" name="phoneno" required placeholder = "Phone Number" pattern="[1-9][0-9]{9}"/>
                <textarea onChange={handleInput} name="address" cols={8} rows={3} required placeholder="Address"></textarea>             
                <span>Amount to be paid on the delivery : <span>₹{total}</span></span>
                <button type="submit" className="btn">Place Order</button>
            </form>
            <Toaster/>
        </Modal>
      );
};