import React from "react";
import  styles  from "./test.module.scss";


export const Test = () => {
  return (
    <div className={styles.test_main}>
      <div className={styles.test_slave}>
        <h2>Привет мир!</h2>
      </div>
    </div>
  )
}