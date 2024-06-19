import { workSpaceMenu } from "./Workspace.data";
import styles from "./Workspace.module.scss";

export default function Workspace() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles["header-text"]}>Строительно-монтажные работы</p>
      </div>
      <div className={styles.container}>
        {workSpaceMenu.map((item) => (
          <p key={item} className={styles['container-item']}>{item}</p>
        ))}
      </div>
    </div>
  );
}
