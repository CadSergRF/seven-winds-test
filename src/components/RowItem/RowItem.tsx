import { useState } from "react";

import { DocumentIcon } from "../../assets/DocumentIcon";
import { TRow } from "../../utils/Types/smr.types";
import RowsAll from "../RowsAll/RowsAll";

import styles from "./RowItem.module.scss";
import { smrApi } from "../../store/api/smr.api";
import { TrashIcon } from "../../assets/TrashIcon";
import clsx from "clsx";
import { newRow } from "./RowItem.constants";

type TRowItemProps = {
  row: TRow;
  level: number;
};

export default function RowItem({ row, level }: TRowItemProps) {
  const { id } = row;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rowState, setRowState] = useState<TRow>(row);
  const [isLevelHover, setIsLevelHover] = useState<boolean>(false);

  const [updateRow] = smrApi.useUpdateRowMutation();
  const [createRow] = smrApi.useCreateRowInEntityMutation();
  const [deleteRow] = smrApi.useDeleteProductMutation()

  const handleSetIsEdit = () => {
    setIsEdit(true);
  };

  const handleChangeValue = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement
    setRowState((prev) => ({
      ...prev,
      [name]: name === "rowName" ? value : Number(value),
    }));
  };

  const handleInputKeyPress = (evt: React.KeyboardEvent<HTMLElement>) => {
    if (evt.key === "Enter") {
      updateRow({ rID: id, updateData: rowState });
      setIsEdit(false);
    }
  };

  const handleCreateRow = () => {
    newRow.parentId = id
    createRow(newRow);
  }

  const handleDeleteRow = () => {
    deleteRow(id);
  }

  return (
    <>
      <div className={styles.container} onDoubleClick={handleSetIsEdit}>
        <div
          onMouseEnter={() => setIsLevelHover(true)}
          onMouseLeave={() => setIsLevelHover(false)}
          className={clsx(styles.level, {
            [styles["level-hover"]]: isLevelHover,
          })}
          style={{ marginLeft: `${level * 10}px` }}
        >
          {/* <div className={styles["level-icon-wrapper"]}> */}
            <DocumentIcon onClick={handleCreateRow}/>
          {/* </div> */}
          {isLevelHover && (
            // <div className={styles["level-icon-wrapper"]}>
              <TrashIcon onClick={handleDeleteRow} />
            // </div>
          )}
        </div>
        {/* Наименование работ */}
        <div className={styles.input}>
          <input
            name="rowName"
            value={rowState.rowName || ""}
            className={styles.input_name}
            disabled={!isEdit}
            onDoubleClick={handleSetIsEdit}
            onChange={handleChangeValue}
            onKeyDown={handleInputKeyPress}
          />
        </div>
        {/* Основная з\п */}
        <div className={styles.input}>
          <input
            name="salary"
            value={rowState.salary}
            className={styles.input_name}
            disabled={!isEdit}
            onDoubleClick={handleSetIsEdit}
            onChange={handleChangeValue}
            onKeyDown={handleInputKeyPress}
          />
        </div>
        {/* Оборудование*/}
        <div className={styles.input}>
          <input
            name="equipmentCosts"
            value={rowState.equipmentCosts}
            className={styles.input_name}
            disabled={!isEdit}
            onDoubleClick={handleSetIsEdit}
            onChange={handleChangeValue}
            onKeyDown={handleInputKeyPress}
          />
        </div>
        {/* Накладные расходы*/}
        <div className={styles.input}>
          <input
            name="overheads"
            value={rowState.overheads}
            className={styles.input_name}
            disabled={!isEdit}
            onDoubleClick={handleSetIsEdit}
            onChange={handleChangeValue}
            onKeyDown={handleInputKeyPress}
          />
        </div>
        {/* Сметная прибыль*/}
        <div className={styles.input}>
          <input
            name="estimatedProfit"
            value={rowState.estimatedProfit}
            className={styles.input_name}
            disabled={!isEdit}
            onDoubleClick={handleSetIsEdit}
            onChange={handleChangeValue}
            onKeyDown={handleInputKeyPress}
          />
        </div>
      </div>
      {row?.child?.map((childRow) => (
        <RowsAll key={childRow.id} rows={row.child} level={level + 1} />
      ))}
    </>
  );
}
