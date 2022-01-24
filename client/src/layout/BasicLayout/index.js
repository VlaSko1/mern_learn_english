import Header from "../../components/Header";
import Main from "../../components/Main";
import styles from './basic.module.scss';

const BasicLayout = (props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Main className={styles.main} elem={props.elem}/>
    </div>
  )
}

export default BasicLayout;