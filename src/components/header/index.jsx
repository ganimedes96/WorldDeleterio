import styles from './header.module.scss'

export const Header = ()=>{
    return(
        <div className={styles.header}>

           <span>Chat</span>
           <button label="Logout" className={styles.btn}>
                <a href="/">Logout</a>
           </button>
        </div>
    )
}