import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon ,HeartFilledIcon} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from 'react'

/**
 * MPC web3auth
 */
import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

export default function IndexPage() {

  const verifier = "tonspack-mpc";

const clientId = "BGhzy_MwnoMn2fP12APsIm0RCv9cove_zNeZp5PIaoIPCZGPYrnlkO2o9Pf8XPhaxQVQOKK7QQCQVf974LZxfEs"; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainId: "0x1",
  displayName: "Ethereum Mainnet",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  tickerName: "Ethereum",
  ticker: "ETH",
  decimals: 18,
  rpcTarget: "https://rpc.ankr.com/eth",
  blockExplorerUrl: "https://etherscan.io",
};

const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

// Initialising Web3Auth Single Factor Auth SDK
const web3authSfa = new Web3Auth({
  clientId, // Get your Client ID from Web3Auth Dashboard
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  usePnPKey: false, // Setting this to true returns the same key as PnP Web SDK, By default, this SDK returns CoreKitKey.
  privateKeyProvider: ethereumPrivateKeyProvider,
});

const [kp, setKp] = useState("");

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const jwtToken = params.get("token");
  if (jwtToken) {
    loginWithWeb3Auth(jwtToken);
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}, []);


const loginWithWeb3Auth = async (idToken: string) => {
  console.log("🔥 loginWithWeb3Auth",idToken)
  // setIsLoggingIn(true);
  // trying logging in with the Single Factor Auth SDK
  try {
    await web3authSfa.init();
    console.log("🔥web3authSfa init")
    const { payload } = decodeToken(idToken);
    console.log(payload)

    console.log("🔥web3authSfa.status",web3authSfa.status,web3authSfa.status == "connected")

    if(web3authSfa.status == "connected")
    {

    }else{
      const cnn = await web3authSfa.connect({
        verifier,
        verifierId: (payload as any).sub,
        idToken: idToken!,
      });
      console.log("🔥 web3authSfa Connect success : ",cnn)
    }
    if (!web3authSfa.provider) {
      console.log("🐞 Web3auth not init")
      return;
    }
    const privateKey = await web3authSfa.provider.request({
      method: "eth_private_key"
    });
    console.log("🐞 Web3auth privateKey : ",privateKey)
    setKp(privateKey as string)

    // setIsLoggingIn(false);
    // setLoggedIn(true);
  } catch (err) {
    // setIsLoggingIn(false);
    console.error(err);
  }
};

const test_btn = async () => {

  console.log("🐞 Web3auth privateKey : ",kp)
}


  return (
    <DefaultLayout name="index">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">

          <h1 className={title({ color: "violet" })}>Tonspack&nbsp;</h1>
          <h1 className={title()}>MPC Test &nbsp;</h1>
          <br />
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.app}
          >
             <HeartFilledIcon size={20} />
            Wallet
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>


        <div>
        <Button color="default" className="capitalize" onClick={test_btn}>
          Test
        </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
