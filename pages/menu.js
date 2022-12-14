import Head from "next/head";
import Layout from "../components/layout";
import Menu  from "../components/menu";
import css from "../styles/Menucard.module.css";
import {client} from "../lib/client";

export default function Menucards({pizza,rice}) {
    // console.log(pizza);
    // console.log(rice);
    return (
      <Layout>
        <div className={css.container}>
          <Head>
            <title>FoodOPS Menu</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/Logo.png" />
          </Head>

                <span className={css.menudisplay}>OUR MENU</span>

          <span className={css.love}>PIZZAS</span>
          <Menu fooditems={pizza}/>
          <span className={css.love}>RICE DISHES</span>
          <Menu fooditems={rice}/>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async() => {
    const pizzaquery = '*[_type == "pizza"]';
    const ricequery = '*[_type == "rice"]';
    const rice = await client.fetch(ricequery);
    const pizza = await client.fetch(pizzaquery);
    return {
      props: {
        pizza,
        rice
      }
    }
  }