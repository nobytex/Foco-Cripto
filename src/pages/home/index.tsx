import {FormEvent, useEffect, useState} from 'react'
import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'

//https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6

interface CoinProps{
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedMarket: string;
    formatedPrice: string;
}

interface DataProps{
    coins: CoinProps[];
}

export function Home(){
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [inputPesquisa, setInputPesquisa] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            fetch('https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6&pref=BRL')
            .then(response => response.json())
            .then((data: DataProps) => {
                //a requisição deu tudo certo
                const coinsData = data.coins.slice(0, 15);

                const price = Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })
                
                const formatResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)), 
                        formatedMarket: price.format(Number(item.market_cap)),

                    }
                    return formated
                })
                
                setCoins(formatResult)
                console.log(formatResult);
            })
            .catch((err) => {
                console.log(err);
            })
        }

        getData();
        
    }, [])

    function handleSearch(event: FormEvent){
        event.preventDefault();
        
        if(inputPesquisa === '') return;

        navigate(`detail/${inputPesquisa}`);
    }
    
    return(
        <main className={styles.container}>
            <form action="" className={styles.form} onSubmit={handleSearch}>
                <input type="text" placeholder='Digite o simbolo da moeda:'
                    value={inputPesquisa} onChange={(e) => setInputPesquisa(e.target.value)}
                />

                <button type='submit'> <BiSearch size={30} color="#FFF" /> </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>

                <tbody>
                    {coins.map((coin) => (
                        <tr key={coin.name} className={styles.tr}>
                        <td className={styles.tdLabel} data-label='Moeda'>
                            <Link className={styles.link} to={`/detail/${coin.symbol}`} ><span>{coin.name}</span> | {coin.symbol}</Link>
                        </td>
                        <td className={styles.tdLabel} data-label='Mercado'>
                            {coin.formatedMarket}
                        </td>
                        <td className={styles.tdLabel} data-label='Preço'>
                            {coin.formatedPrice}
                        </td>
                        <td className={Number(coin?.delta_24h.replace(/,/g, '.')) >= 0 ? styles.tdProfit : styles.tdLoss} data-label='Volume'>
                            <span>{coin.delta_24h}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                
            </table>





        </main>
    )
}