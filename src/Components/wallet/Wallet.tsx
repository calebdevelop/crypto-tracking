import React, {useState} from 'react';

interface IState {
    wallets: {
        currency: string,
        name: string,
        amount: number,
        price: number,
        buyPrice: number
    }[]
}

const walletList: IState["wallets"]  = [
    {
        currency: 'BTC',
        name: 'BitCoin',
        amount: 1.02,
        price: 44600,
        buyPrice: 44000
    },
    {
        currency: 'USDT',
        name: 'Theter',
        amount: 100,
        price: 0.8,
        buyPrice: 1
    },
    {
        currency: 'MANA',
        name: 'Decentraland',
        amount: 30,
        price: 3.9,
        buyPrice: 1.2
    },
    {
        currency: 'ADA',
        name: 'Cardano',
        amount: 78,
        price: 1.19,
        buyPrice: 1.66
    },
    {
        currency: 'SAND',
        name: 'Sandbox',
        amount: 29,
        price: 4.5,
        buyPrice: 5
    }
]

function Wallet () {

    const [wallets, setWallets] = useState<IState["wallets"]>(walletList)

    const getValuePrice = (amount: number, price: number) => {
        return amount * price
    }

    const getPlusValuePrice = (amount: number, price: number, buyPrice: number) => {
        let currentPrice = amount * price
        let totalByuPrice = amount * buyPrice
        return currentPrice - totalByuPrice
    }

    const getPlusValuePercent = (price: number, buyPrice: number) => {
        return ((price - buyPrice) / buyPrice)*100
    }

    const calculateTotalPlusValue = () => {
        let totalBuyPrice: number = 0
        let totalCurrentPrice: number = 0
        wallets.forEach(wallet => {
            totalBuyPrice += wallet.buyPrice
            totalCurrentPrice += wallet.price
        })

        return getPlusValuePercent(totalCurrentPrice, totalBuyPrice)
    }

    const formatNumberAmount = (number: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
    }

    const getTotalPrice = () => {
        let total: number = 0
        wallets.forEach(wallet => {
            total += wallet.price * wallet.amount
        })

        return total
    }

    return (
        <div className={"wg-wallet"}>
            
            <div className='wallet-head'>
                <h3>Portefeuille</h3>
                <h5>CRYPTO</h5>
                <span className='total-price'>{formatNumberAmount(getTotalPrice())}</span>
            </div>
            <ul className='wallet-list-wrapper'>
                {wallets.map((wallet, i) => {

                    let plusValuePrice = getPlusValuePrice(wallet.amount, wallet.price, wallet.buyPrice)

                    return (
                        <li className='wallet-item' key={i}>
                            <div className='logo-wrapper'>
                                <img src={`/img/logo/${wallet.currency.toLowerCase()}.svg`}/>
                            </div>
                            <div className='description-wrapper'>
                                <span className={"name"}><strong>{wallet.currency}</strong> {wallet.name}</span>
                                <span className='price'>{wallet.amount} | {formatNumberAmount(wallet.price)}</span>
                            </div>
                            <div className='profit-wrapper'>
                                <span className='price'><strong>{formatNumberAmount(getValuePrice(wallet.amount, wallet.price))}</strong></span>
                                <span className='profit'>
                                    <nav className={plusValuePrice > 0 ? 'green' : 'red'}>
                                        {plusValuePrice > 0 && '+'}{`${formatNumberAmount(plusValuePrice)}`} <span>{getPlusValuePercent(wallet.price, wallet.buyPrice).toFixed(2)}%</span>
                                    </nav>                                    
                                </span>
                            </div>
                        </li>
                    )                    
                })}
            </ul>
        </div>
    )
}

export default Wallet