import LogoImg from "../../assets/logo.svg";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={LogoImg} alt="" />
    </header>
  );
}
