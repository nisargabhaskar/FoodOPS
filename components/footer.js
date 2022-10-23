import css from "../styles/Footer.module.css"
import {UilInstagram,UilGithub} from "@iconscout/react-unicons"
import Image from 'next/image';
import Logo from '../assets/Logo.png'



export default function Footer() {
    return(
        <div className={css.container}>
            <span>VISIT US AGAIN</span>
            <div className={css.social}>
                <UilInstagram size={25}/>
                <UilGithub size={25}/>
            </div>
            <div className={css.logo}>
                <Image src={Logo} alt ="logo image"height={20} width={20}/>
                <span>FoodOPS</span>
            </div>
        </div>
    );
};