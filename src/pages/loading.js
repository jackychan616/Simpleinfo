import { Loader, Container, Space, Center } from '@mantine/core';
import styles from './page.module.css';
import { ReactElement } from "react";


function Loading() {
  return (
      <div className={styles.div_simple}>
            <Loader color="indigo" size="xl" variant="bars" />
            <span><Space h="xm" /></span>
            <span><h className = {styles.s}>S</h></span>
            <span><h className={styles.i}>i</h></span>
            <span><h className= {styles.m}>m</h></span>
            <span><h className = {styles.p}>p</h></span>
            <span><h className = {styles.l}>l</h></span>
            <span><h className = {styles.e}>e</h></span>
      </div>
  );
}
Loading.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Loading;