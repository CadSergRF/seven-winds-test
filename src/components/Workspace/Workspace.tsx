import { useAppSelector } from "../../hooks/redux.hooks";

import RowsAll from "../RowsAll/RowsAll";

import { workSpaceMenu } from "./Workspace.data";
import styles from "./Workspace.module.scss";

export default function Workspace() {

  const rowsState = useAppSelector((state) => state.rowsView);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles["header-text"]}>Строительно-монтажные работы</p>
      </div>
      <div className={styles.container}>
        {workSpaceMenu.map((item) => (
          <p key={item} className={styles["container-item"]}>
            {item}
          </p>
        ))}
      </div>
      {rowsState.isError && <div>{rowsState.isError}</div>}
      {!rowsState.isError && <RowsAll rows={rowsState.rows} level={0} />}
    </div>
  );
}
