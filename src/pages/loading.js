import { Loader, Container, Space, Center } from '@mantine/core';
import styles from './page.module.css';


function old() {
  return (
      <div className={styles.div_loader}>
            <Loader color="indigo" size="xl" variant="bars" />
            <span><Space h="xm" /></span>
          <div className={styles.div_simple_word}>
            <span><h className = {styles.s}>S</h></span>
            <span><h className={styles.i}>i</h></span>
            <span><h className= {styles.m}>m</h></span>
            <span><h className = {styles.p}>p</h></span>
            <span><h className = {styles.l}>l</h></span>
            <span><h className = {styles.e}>e</h></span>
          </div>
      </div>
  );
}
function Loading(){
  return(
    <div>
      <Center style={{position:"relative",top:"200px"}}>
        <h className={styles.loading_s}>simpleinfo</h>
      </Center>

      <style jsx global>
      {`
      @keyframes blackWhite {  
              0% { background-color: white; }
              25% { background-color: #C0C0C0; }
              50% { background-color: white; }
              75% { background-color: #C0C0C0; }
      }
      body {
        height: 100px;
        background-color: black;
        -webkit-animation-name: blackWhite;  
        -webkit-animation-iteration-count: infinite;  
        -webkit-animation-duration: 3s;   
       }
      `}
      </style>
    </div>
  )
}
Loading.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Loading;