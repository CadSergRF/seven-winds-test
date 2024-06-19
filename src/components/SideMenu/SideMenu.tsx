import clsx from "clsx";
import { ArrowDownIcon } from "../../assets/ArrowDownIcon";
import { MenuSubItemIcon } from "../../assets/MenuSubItemIcon";
import styles from "./SideMenu.module.scss";
import { menuList } from "./SubMenu.data";

export default function SideMenu() {
  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        <div>
          <p className={styles["header-text"]}>Название проекта</p>
          <p className={styles["header-text--sub"]}>Аббревиатура</p>
        </div>
        <button type="button" className={styles.button}>
          <div className={styles.icon}>
            <ArrowDownIcon />
          </div>
        </button>
      </div>
      <ul>
        {menuList.map((item) => (
          <li key={item}>
            <button type="button" className={clsx(styles["list-item"], {
                [styles['list-item-active']]: (item === 'СМР')
            })}>
              <div className={styles.icon}>
                <MenuSubItemIcon />
              </div>
              <p className={styles['list-item-text']}>{item}</p>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
