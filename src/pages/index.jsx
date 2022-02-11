import Head from 'next/head'

import styles from '../styles/home.module.scss'
import { useState,useEffect } from 'react'
import {useRouter} from 'next/router'
import User from '../../public/ninja.svg'



export default function Home() {
  const [username, setUsername] = useState()
  const router = useRouter()
  console.log(username)
  
  

       
      

       
  

  
  
  return (
    <>
       <Head>
        <title>Universe-Messege</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.content}>
                  <div className={styles.imageUser}>
                        
                  <img src={`https://github.com/${username}.png`} />

                     
                        
                        <span>{username}</span>
                  </div>
                  <div className={styles.userName}>
                    <h2 className={styles.Title}>Bem vindo ao Reino Deletério!</h2>
                    <p>Universe-Deletério</p>
                      <form 
                          onSubmit={(eventInfo)=>{
                          eventInfo.preventDefault()
                          
                          router.push(`/chat?username=${username}`)  
                      }}>
                          <input 
                            type="text" 
                            className='name' 
                            placeholder='Digite seu usuario do Github'
                            value={username}
                            required
                            onChange={(event)=>{
                              const valor = event.target.value
                              setUsername(valor)
                            }}/>
                          <button  type="submit" className={styles.btn}>
                                Entrar
                          </button>
                      </form>
  
                  </div>
              </div>
  
            </div>
        </div>
     </>
  )
    
    
}
