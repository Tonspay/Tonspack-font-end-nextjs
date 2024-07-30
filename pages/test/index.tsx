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

import {wallet_connect,wallet_list_generate,wallet_init_data_set} from "../../core/wallet/index";

import { useState, useEffect } from 'react'

import  { Toaster } from 'react-hot-toast';
import { deving , address_readable} from "../../core/utils/utils"

import {telegramShareApp} from "../../core/utils/tg"

import Router from "next/router"

import { RiArrowDownDoubleFill } from 'react-icons/ri'

type walletCard = {
  title: string,
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
      const ws = [
        {
            "title": "Bitcoin Chain",
            "address": "159t...9yQr6",
            "full_address": "159trGW9CKjt6pxcP5BwXJQPyd8Dx9yQr6",
            "scan": "https://mempool.space/address/159trGW9CKjt6pxcP5BwXJQPyd8Dx9yQr6",
            "img": "/images/chains/btc.svg",
            "name": "Bitcoin Chain",
            "bal": "0 BTC"
        },
        {
            "title": "Binance Smart Chain",
            "address": "0x9e...f90a1",
            "full_address": "0x9e5ec001f7939772dd3e0fce6d667ebcae2f90a1",
            "scan": "https://bscscan.io/address/0x9e5ec001f7939772dd3e0fce6d667ebcae2f90a1",
            "img": "/images/chains/bnb.svg",
            "name": "Binance Smart Chain",
            "bal": "0 BNB"
        },
        {
            "title": "Solana Chain",
            "address": "FZDT...fS6qt",
            "full_address": "FZDTLUxb1SjNwxDLkwC6LgpBHbRFcceVaHcZuyefS6qt",
            "scan": "https://solscan.io/account/FZDTLUxb1SjNwxDLkwC6LgpBHbRFcceVaHcZuyefS6qt",
            "img": "/images/chains/sol.svg",
            "name": "Solana Chain",
            "bal": "0 SOL"
        },
        {
            "title": "Ton Chain",
            "address": "EQDc...tA8m-",
            "full_address": "EQDcVhCbf5r0r8VkHK4ZxbuWj-r39h1AB0aVQquIbnitA8m-",
            "scan": "https://tonviewer.com/EQDcVhCbf5r0r8VkHK4ZxbuWj-r39h1AB0aVQquIbnitA8m-",
            "img": "/images/chains/ton.svg",
            "name": "Ton Chain",
            "bal": "0 TON"
        }
    ]
    setData(ws)
    setIsMainPageLoading(false)
    setIsNav('wallet')
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

      </div>
      </section>
    </DefaultLayout>
  );
}
