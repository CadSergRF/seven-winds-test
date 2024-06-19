import clsx from "clsx";
import { BackIcon } from "../../assets/BackIcon";
import { MenuIcon } from "../../assets/MenuIcon";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.container}>
        <button type="button" className={styles.button}>
          <div className={styles.icon}>
            <MenuIcon />
          </div>
        </button>
        <button type="button" className={styles.button}>
          <div className={styles.icon}>
            <BackIcon />
          </div>
        </button>
      <nav>
        <ul className={styles.list}>
            <li className={clsx(styles['list-item'], styles['list-item--active'])}>Просмотр</li>
            <li className={styles['list-item']}>Управление</li>
        </ul>
      </nav>
    </header>
  );
}
