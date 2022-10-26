import css from "../styles/Hero.module.css"
import Cherry from "../assets/Cherry.png"
import Image from "next/image"
import HeroImage from "../assets/HeroImage.png"
import {UilPhone} from "@iconscout/react-unicons"
import Pizza1 from "../assets/p1.jpg"
export default function Hero() {
    return(
        <div className={css.container}>
            {/* left side */}
            <div className={css.left}>
                <div className={css.cherryDiv}>
                    <span>Good food within Minutes</span>
                    <Image src={Cherry} alt ="small scooter image" width={20} height={20}/>
                </div>
                <div className={css.heroText}>
                    <span>Want a delicious meal,</span>
                    <span>but no time...</span>
                    <span>we will deliver it hot and yummy.</span>            
                </div>
                <div className={css.miniText}>
                Made with love, savored with interest.
                </div>
                <button className={`btn ${css.btn}`}>Explore</button>
            </div>

            {/* right side */}
            <div className={css.rightside}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="food eating women" layout="intrinsic"/>
                </div>
                <div className={css.Contact}>
                    <span> <a href="tel:+123456789">Contact Us</a></span>
                    <div>
                        <UilPhone color="white"/>
                    </div>
                </div>
            </div>
        </div>

    )
};