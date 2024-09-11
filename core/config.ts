interface ObjConfig {
  siteBaseUrl: string;
  solanaConnection: string;
  evmProviders: {
    [x: string]: string;
  };
  botUrl: string;
  appUrl: string;
  websiteUrl: string;
  chains: {
    [x: string]: {
      icon: string;
      name: string;
      type: number;
      symbol: string;
      decimal: number;
      scan: {
        address: string;
        tx: string;
      };
      rpc: string[];
    };
  };
  evmsChains: {
    [x: string]: {
      icon: string;
      name: string;
      type: number;
      symbol: string;
      decimal: number;
      rpc: string[];
      scan: {
        address: string;
        tx: string;
      };
    };
  };
  defaultChains: {
    t: number;
    c: number;
  }[];
}

const config: ObjConfig = {
  siteBaseUrl: "https://app.tonspack.com/",
  solanaConnection:
    "https://mainnet.helius-rpc.com/?api-key=a32e6052-b2ed-491f-9521-ac6df5e9665a",
  evmProviders: {
    arb: "https://arbitrum.llamarpc.com",
    bsc: "https://binance.llamarpc.com",
  },
  botUrl: "https://t.me/tonspack_bot",
  appUrl: "https://t.me/tonspack_bot/app",
  websiteUrl: "https://tonspack.com/",
  chains: {
    default: {
      icon: "/images/chains/eth.svg",
      name: "",
      type: 0,
      symbol: "",
      decimal: 18,
      scan: {
        address: "",
        tx: "",
      },
      rpc: [],
    },
    solana: {
      icon: "/images/chains/sol.svg",
      name: "Solana",
      type: 1,
      symbol: "SOL",
      decimal: 9,
      scan: {
        address: "https://solscan.io/account/",
        tx: "https://solscan.io/tx/",
      },
      rpc: [
        "https://solana-mainnet.g.alchemy.com/v2/2HWIMGYhZm3HJXTVlyfVWThcSpgP9Twu",
      ],
    },
    ton: {
      icon: "/images/chains/ton.svg",
      name: "Ton",
      type: 2,
      symbol: "TON",
      decimal: 9,
      scan: {
        address: "https://tonviewer.com/",
        tx: "https://tonviewer.com/transaction/",
      },
      rpc: [],
    },
    tron: {
      icon: "/images/chains/tron.svg",
      name: "Tron",
      type: 5,
      symbol: "TRX",
      decimal: 6,
      scan: {
        address: "https://tronscan.org/#/address/",
        tx: "https://tronscan.org/#/transaction/",
      },
      rpc: [],
    },
    btc: {
      icon: "/images/chains/btc.svg",
      name: "Bitcoin",
      type: 3,
      symbol: "BTC",
      decimal: 8,
      scan: {
        address: "https://mempool.space/address/",
        tx: "https://mempool.space/tx/",
      },
      rpc: [],
    },
  },
  evmsChains: {
    default: {
      icon: "/images/chains/eth.svg",
      name: "",
      type: 0,
      symbol: "",
      decimal: 18,
      rpc: [],
      scan: {
        address: "https://etherscan.io/address/",
        tx: "https://etherscan.io/tx/",
      },
    },
    "1": {
      icon: "/images/chains/eth.svg",
      name: "Ethereum",
      type: 0,
      symbol: "ETH",
      decimal: 18,
      rpc: ["https://eth.llamarpc.com", "https://rpc.mevblocker.io"],
      scan: {
        address: "https://etherscan.io/address/",
        tx: "https://etherscan.io/tx/",
      },
    },
    "56": {
      icon: "/images/chains/bnb.svg",
      name: "Binance Smart Chain",
      type: 0,
      symbol: "BNB",
      decimal: 18,
      rpc: ["https://binance.llamarpc.com", "https://1rpc.io/bnb"],
      scan: {
        address: "https://bscscan.io/address/",
        tx: "https://bscscan.io/tx/",
      },
    },
    "42161": {
      icon: "/images/chains/arb.svg",
      name: "Arbitrum One",
      type: 0,
      symbol: "ETH",
      decimal: 18,
      rpc: ["https://arbitrum.llamarpc.com", "https://1rpc.io/arb"],
      scan: {
        address: "https://arbiscan.io/address/",
        tx: "https://arbiscan.io/tx/",
      },
    },
    "8453": {
      icon: "/images/chains/base.svg",
      name: "Base",
      type: 0,
      symbol: "ETH",
      decimal: 18,
      rpc: ["https://base.llamarpc.com", "https://1rpc.io/base"],
      scan: {
        address: "https://basescan.org/address/",
        tx: "https://basescan.org/tx/",
      },
    },
    "43114": {
      icon: "/images/chains/avax.svg",
      name: "Aavalance",
      type: 0,
      symbol: "AVAX",
      decimal: 18,
      rpc: ["https://avalanche.drpc.org", "https://1rpc.io/avax/c"],
      scan: {
        address: "https://snowtrace.io/address/",
        tx: "https://snowtrace.io/tx/",
      },
    },
    "137": {
      icon: "/images/chains/polygon.svg",
      name: "Polygon",
      type: 0,
      symbol: "matic",
      decimal: 18,
      rpc: ["https://polygon.llamarpc.com", "https://1rpc.io/base"],
      scan: {
        address: "https://polygonscan.com/address/",
        tx: "https://polygon.drpc.org",
      },
    },
    "10": {
      icon: "/images/chains/op.svg",
      name: "OP Mainnet",
      type: 0,
      symbol: "ETH",
      decimal: 18,
      rpc: ["https://optimism.drpc.org", "https://1rpc.io/op"],
      scan: {
        address: "https://optimistic.etherscan.io/address/",
        tx: "https://optimistic.etherscan.io/tx/",
      },
    },
  },
  defaultChains: [
    {
      t: 3,
      c: 0,
    },
    {
      t: 0,
      c: 56,
    },
    {
      t: 1,
      c: 0,
    },
    {
      t: 2,
      c: 0,
    },
  ],
};

export default config;
