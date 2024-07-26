interface ObjConfig {
    siteBaseUrl : string,
    solanaConnection:string,
    evmProviders:{
        [x:string]: string
    },
    botUrl:string,
    appUrl:string,
    websiteUrl:string,
    chains:{
        [x:string]: {
            icon:string,
            name:string,
            symbol:string,
            decimal:number,
            scan:{
                address:string,
                tx:string,
            }
        },
    },
    evmsChains:{
        [x:string]: {
            icon:string,
            name:string,
            symbol:string,
            decimal:number,
            scan:{
                address:string,
                tx:string,
            }
        },
    },
    defaultChains:{
        t:number,
        c:number
    }[]
  }

const config:ObjConfig = {
    siteBaseUrl : 'https://pack.tons.ink/',
    solanaConnection:"https://mainnet.helius-rpc.com/?api-key=a32e6052-b2ed-491f-9521-ac6df5e9665a",
    evmProviders:{
        arb:'https://arbitrum.llamarpc.com',
        bsc:'https://binance.llamarpc.com'
    },
    botUrl:"https://t.me/tonspack_bot",
    appUrl:"https://t.me/tonspack_bot/app",
    websiteUrl:"https://tonspack.com/",
    chains:{
        default:{
            icon:"/images/chains/eth.svg",
            name:"",
            symbol:"",
            decimal:18,
            scan:{
                address:"",
                tx:""
            }
        },
        solana:{
            icon:"/images/chains/sol.svg",
            name:"Solana Chain",
            symbol:"SOL",
            decimal:9,
            scan:{
                address:"https://solscan.io/account/",
                tx:"https://solscan.io/tx/"
            }
        },
        ton:{
            icon:"/images/chains/ton.svg",
            name:"Ton Chain",
            symbol:"TON",
            decimal:8,
            scan:{
                address:"https://tonviewer.com/",
                tx:"https://tonviewer.com/transaction/"
            }
        },
        tron:{
            icon:"/images/chains/tron.svg",
            name:"Tron Chain",
            symbol:"TRX",
            decimal:6,
            scan:{
                address:"https://tronscan.org/#/address/",
                tx:"https://tronscan.org/#/transaction/"
            }
        },
        btc:{
            icon:"/images/chains/btc.svg",
            name:"Bitcoin Chain",
            symbol:"BTC",
            decimal:8,
            scan:{
                address:"https://mempool.space/address/",
                tx:"https://mempool.space/tx/"
            }
        },
    },
    evmsChains:{
        "default":{
            icon:"/images/chains/eth.svg",
            name:"",
            symbol:"",
            decimal:18,
            scan:{
                address:"https://etherscan.io/address/",
                tx:"https://etherscan.io/tx/"
            }
        },
        "1":{
            icon:"/images/chains/eth.svg",
            name:"Ethereum Chain",
            symbol:"ETH",
            decimal:18,
            scan:{
                address:"https://etherscan.io/address/",
                tx:"https://etherscan.io/tx/"
            }
        },
        "56":{
            icon:"/images/chains/bnb.svg",
            name:"Binance Smart Chain",
            symbol:"BNB",
            decimal:18,
            scan:{
                address:"https://bscscan.io/address/",
                tx:"https://bscscan.io/tx/"
            }
        },
        "42161":{
            icon:"/images/chains/arb.svg",
            name:"Arbitrum One Chain",
            symbol:"ETH",
            decimal:18,
            scan:{
                address:"https://arbiscan.io/address/",
                tx:"https://arbiscan.io/tx/"
            }
        },
        "8453":{
            icon:"/images/chains/base.svg",
            name:"Base Chain",
            symbol:"ETH",
            decimal:18,
            scan:{
                address:"https://basescan.org/address/",
                tx:"https://basescan.org/tx/"
            }
        },
        "43114":{
            icon:"/images/chains/avax.svg",
            name:"Aavalance Chain",
            symbol:"AVAX",
            decimal:18,
            scan:{
                address:"https://snowtrace.io/address/",
                tx:"https://snowtrace.io/tx/"
            }
        },
        "137":{
            icon:"/images/chains/polygon.svg",
            name:"Polygon Chain",
            symbol:"matic",
            decimal:18,
            scan:{
                address:"https://polygonscan.com/address/",
                tx:"https://polygonscan.com/tx/"
            }
        },
        "10":{
            icon:"/images/chains/op.svg",
            name:"OP Mainnet Chain",
            symbol:"ETH",
            decimal:18,
            scan:{
                address:"https://optimistic.etherscan.io/address/",
                tx:"https://optimistic.etherscan.io/tx/"
            }
        }
    },
    defaultChains:[
        {
            t:3,
            c:0,
        },
        {
            t:0,
            c:56,
        },
        {
            t:1,
            c:0,
        },
        {
            t:2,
            c:0,
        }
    ]
}

export default config;