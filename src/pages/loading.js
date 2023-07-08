import { Loader, Container, Space, Center } from '@mantine/core';
import styles from './page.module.css';
import { ReactElement } from "react";
import { blue } from '@mui/material/colors';


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
    <Center style={{position:"relative",top:"200px"}}>
      <Container>
        <h className={styles.loading}>simpleinfo</h>
      </Container>
    </Center>
  )
}
Loading.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Loading;