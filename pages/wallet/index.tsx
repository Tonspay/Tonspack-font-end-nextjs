import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar"
import {Image }from "@nextui-org/image";
import {Chip} from "@nextui-org/chip"
import {Divider} from"@nextui-org/divider"

import {Loading} from "@/components/loading";

import {wallet_connect,wallet_list_generate,wallet_init_data_set,wallet_mpc_get_kp,wallet_mpc_try_get_kp,mpc} from "../../core/wallet/index";

import { useState, useEffect } from 'react'

import  { Toaster } from 'react-hot-toast';
import { deving , address_readable} from "../../core/utils/utils"

import {telegramShareApp} from "../../core/utils/tg"

import Router from "next/router"

type walletCard = {
  title: string,
  full_address:string,
  address:string,
  scan:string,
  img: string,
  name:string,
  bal:string,
}

export default function DocsPage() {
  // let list : walletCard[];
  let list : walletCard[];
  list = [];
  const [data, setData] = useState([
    {
      title: "pending",
      address:"",
      full_address:"",
      scan:"",
      img: "",
      name:"",
      bal:"",
    }
  ])

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");
  useEffect(() => {
    const onload =async ()=>{
      const connect = true;
      // const connect = await wallet_connect();
      // console.log("🚧 connect :: ",connect)
      const mpc_kp = await wallet_mpc_try_get_kp()
      if(mpc_kp)
      {
        // console.log("🚧 mpc_kp :: ",mpc_kp)
        const kps = mpc.getKp(mpc_kp)
        // console.log("🚧 kps :: ",kps)
        const wallets = mpc.getAddress(mpc_kp,false);
        // console.log("🚧 wallets :: ",wallets)
        const ws = await wallet_list_generate(wallets)
        console.log("🚧 Wallets :: ",ws)
        setData(ws)
        // setData([])
        setIsMainPageLoading(false)
        setIsNav('wallet')
      }
      // console.log("🚧 hook test")
    }
    onload().catch(console.error);;
  }, [])
  // return returnFont()
  return (
    <DefaultLayout name={isNav}>
      {
        isMainPageLoading ? <Loading /> : null
      }
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Toaster />
        {/* <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Wallets</h1>
        </div> */}

    { 
    data.map((item, index) => (
      <Card style={{maxWidth:"400px",width:"100%"}} key={index} shadow="sm" radius="lg"
        isPressable onPress={() => {
          console.log("Card details router");
          Router.push({pathname: '/wallet_details', query: item})
        }}
        >
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Image
                  alt="chain logo"
                  height={40}
                  radius="sm"
                  src={item.img}
                  width={40}
                />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{item.name}</h4>
            </div>
          </div>
          <Link
          isExternal
          href={item.scan}
          >
          <Chip className="text-tiny text-white" variant="flat" color="default" radius="lg" size="sm" >Copy</Chip>
          </Link>
          
        </CardHeader>
        <CardBody style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
          <div className="flex gap-1">
            <div className=" text-default-400 text-small" style={{textAlign:"center" ,width:'100%'}}>{address_readable(12,12,item.full_address)}</div>
          </div>
          <div className="flex gap-1">
            <div className="text-big" style={{textAlign:"center" ,width:'100%'}}>{item.bal}</div>
          </div>
        </CardBody>
      </Card>
    ))
    }

      <div style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
      <Button color="primary" onClick={deving} style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
        Managment
      </Button>

      {/* <Button color="primary" onClick={()=>{Router.push("test")}} style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>Test</Button> */}
      </div>
      </section>
    </DefaultLayout>
  );
}
