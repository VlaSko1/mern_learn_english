import React from "react";
import  styles  from "./test.module.scss";
import Button from '@mui/material/Button';


export const Test = () => {
  return (
    <div className={styles.test_main}>
      <div className={styles.test_slave}>
        <h2>Привет мир!</h2>
        <Button variant="contained">contained</Button>
      </div>
    </div>
  )
}