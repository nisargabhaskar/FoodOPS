import Head from "next/head";
import Layout from "../components/layout";
import Hero from "../components/hero";
import css from "../styles/Home.module.css";
import Services from "../components/services";
import {client} from "../lib/client";
import Menu  from "../components/menu";

export default function Home({pizza,rice}) {
  // console.log(pizza);
  // console.log(rice);
  return (
    <Layout>
      <div className={css.container}>
        <Head>
          <title>FoodOPS</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/Logo.png" />
        </Head>
        {/* body */}
        <main>  
          <Hero/>
          <Services/>
          <div className={css.menucontainer}>
            <div className={css.menuheading}>
                <span>OUR MENU</span>
                <span>The One That Always..</span>
                <span>Make You Fall In <span className={css.love}>LOVE</span></span>
            </div>
          </div>
          <Menu fooditems={pizza}/>
          <Menu fooditems={rice}/>
        </main>
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