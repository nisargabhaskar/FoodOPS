import css from '../styles/Header.module.css'
import Image from 'next/image';
import Logo from '../assets/Logo.png'
import {UilShoppingBag,UilReceipt} from '@iconscout/react-unicons'
import {useStore} from '../store/store'
import Link from 'next/link';
import { useState ,useEffect} from 'react';

export default function Header(){
    // console.log(useStore((state)=>state))
    const [Order, setOrder] = useState("")
    useEffect(() => {
        setOrder(localStorage.getItem("order"));
    },[])
    
    const itemlength = useStore((state)=>state.cart.fooditems.length)
    return(
        <div className={css.header}>
            {/* logo side */}
            <div className={css.logo}>
                <Image src={Logo} alt ="logo image" height={50} width={50}/>
                <span>FoodOPS</span>
            </div>

            {/* menu side */}
            <ul className={css.menu}>
                <li><Link href='../'>Home</Link></li>
                <li>Menu</li>
                <li>Contact</li>
            </ul>

            {/* cart side */}
            <Link href='/cart'>
                <div className={css.cartside}>
                    <div className={css.cart}>
                        <UilShoppingBag size={35} />
                        <div className={css.badge}>{itemlength}</div>
                    </div>
                </div>
            </Link>
            {Order && (
                <Link href={`/order/${Order}`}>
                    <div className={css.cart}>
                        <UilReceipt size={35} color='#2E2E2E'/>
                        {Order != "" && <div className={css.badge}>1</div>}
                    </div>
                </Link>
            )}
        </div>
    );
};