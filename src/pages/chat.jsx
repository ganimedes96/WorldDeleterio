import styles from "../styles/chat.module.scss";
import { Header } from "../components/header";
import { useState, useEffect } from "react";
import {createClient} from '@supabase/supabase-js'
import { useRouter } from "next/router";
import {ButtonSendSticker} from '../components/button'
import appConfig from '../../config.json';





const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY0MDgxNywiZXhwIjoxOTU5MjE2ODE3fQ.1r5XiXMtQlDXo7pNOxuhm2vn3QvmYhJERV6hY1wwF0E'
const SUPABASE_URL = 'https://xphlpgywjoydmxbpegba.supabase.co'

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


const listeningMessage =(appendMessage)=>{
   return(
     supabaseClient
     .from('Messege')
     .on('INSERT', (responseLive)=>{
        appendMessage(responseLive.new)
     }) 
     .subscribe()
   )
}

export default function Chat() {
  const router = useRouter()
  const loggedInUser = router.query.username

 


  const [messege, setMessege] = useState("");
  const [messegeList, setMessegeList] = useState([
    
  ]);

  useEffect(() =>{
    
    supabaseClient
      .from('Messege')
      .select('*')
      .order('id', {ascending: false})
      .then(({data})=> {
        //console.log('Dados',data)
        setMessegeList(data)
      })
      listeningMessage((newMessege)=>{
        setMessegeList((currentListValue)=>{
          return[
            newMessege,
           ...currentListValue
          ]
        });
      })
  },[])


  const hundleNewMessege = (newMessege) => {
    const messege = {
      // id: messegeList.length + 1,
      text: newMessege,
      from: loggedInUser,
    };

    supabaseClient
      .from('Messege')
      .insert([messege])
      .then(({data})=> {
        // console.log('criando mensagem', response)  
        
      })
    setMessege("");
  };




  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />

        <Box posts={messegeList} />
        

        <form action="">
          <textarea
            value={messege}
            onChange={(event) => {
              const value = event.target.value;
              setMessege(value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                //console.log(event);
                hundleNewMessege(messege);
              }
            }}
            className={styles.text}
            ols="30"
            rows="2"
            placeholder="Insira sua mensagem aqui..."
          ></textarea>
          <ButtonSendSticker
              onStickerClick={(sticker)=>{
                //console.log('[usando o componente]  sticker');
                hundleNewMessege(`:sticker:${sticker}`)
              }}
          />
        </form>
      </div>
    </div>
  );
}

const Box = (props) => {
  //c//onsole.log(props);
  return (
    <div className={styles.boxMessege}>
      {props.posts.map((messege) => {
        return (
          <div className={styles.contentmessege}>
            <div className={styles.user}>
              <img src={`https://github.com/${messege.from}.png`} alt="" />
              <span>{messege.from}</span>
              <time>
              {new Date().toLocaleDateString()}

              </time>

            </div>
            {/* Consicional:{messege.text.startsWith(':sticker:').toString()} */}
            {messege.text.startsWith(':sticker:') 
            ?(
              <img src={messege.text.replace(':sticker:', '')}/>
             )
            :(
              messege.text
            
             )}


            {/* <div className={styles.messege}>
              <li key={messege.id}>{messege.text}</li>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};
