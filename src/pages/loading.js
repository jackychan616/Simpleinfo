import { Loader, Container } from '@mantine/core';
import styles from './page.module.css';
import { ReactElement } from "react";


function Loading() {
  return (
      <div className={styles.loader_div}>
          <Loader color="indigo" size="xl" variant="bars" />
      </div>
  );
}
Loading.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Loading;