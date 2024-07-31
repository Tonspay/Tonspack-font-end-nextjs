import Styles from '@/styles/ButtomNav.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RiHomeSmile2Line, RiHomeSmile2Fill, RiSearchEyeFill } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { RiSettings5Line, RiSettings5Fill , RiShoppingBag2Fill ,RiShoppingBag2Line,RiWallet3Fill,RiWallet3Line,RiMenu2Fill,RiMenu3Line} from 'react-icons/ri'

export const ButtomNav = (props:any) => {
    const router = useRouter()
    // console.log(props)
    const name = props.name;
    const [activeTabs, setActiveTabs] = useState(props.name)
    const [switchRouter, setSwitchRouter] = useState(props.name)
    useEffect(() => {
        switch (switchRouter) {
            case 'wallet':
                router.push('/wallet')
                break;
            case 'setting':
                router.push('/setting')
                break;
            case 'dapp':
                router.push('/dapp')
                break;
            default:
                // router.push('/')
                break;
        }
    }, [switchRouter, router])
    if(name === "" || name == "index"|| name == "action")
    {
        return (null)
    }

    return (
        <div className={`${Styles.bottomNav}`}>

            <div className={`${Styles.bnTab}`}>
                {name == 'dapp' ?
                    <RiMenu2Fill
                        size='35'
                        color='white'
                        onClick={() => setSwitchRouter('dapp')}
                    /> :
                    <RiMenu3Line
                        size='35'
                        color='white'
                        onClick={() => setSwitchRouter('dapp')}
                    />}
            </div>
            <div className={`${Styles.bnTab}`}>
                {name == 'wallet' ?
                    <RiWallet3Fill
                        size='35'
                        color='white'
                        onClick={() => setSwitchRouter('wallet')}
                    /> :
                    <RiWallet3Line
                        size='35'
                        color='white'
                        onClick={() => setSwitchRouter('wallet')}
                    />}
            </div>

            <div className={`${Styles.bnTab}`}>
                {name == 'setting' ?
                    <RiSettings5Fill
                        size='35'
                        color='white'
                        onClick={() => setSwitchRouter('setting')}
                    /> :
                    <RiSettings5Line
                        size='35'
                        color='white'
                        onClick={() => setSwitchRouter('setting')}
                    />}
            </div>
        </div>
    )
}
