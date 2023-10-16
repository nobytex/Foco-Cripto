import { Link } from 'react-router-dom'
import styles from './error404.module.css'

export function Error404(){
    return(
        <div className={styles.container}>
            <h1>Página 404 não existe</h1>
            <Link to='/'>Acessar Criptomoedas</Link>
        </div>
    )
}