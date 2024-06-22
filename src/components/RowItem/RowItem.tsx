import { useState } from "react";

import { DocumentIcon } from "../../assets/DocumentIcon";
import { TRow } from "../../utils/Types/smr.types";
import RowsAll from "../RowsAll/RowsAll";

import styles from "./RowItem.module.scss";
import { smrApi } from "../../store/api/smr.api";
import { TrashIcon } from "../../assets/TrashIcon";
import clsx from "clsx";
import { newRow } from "./RowItem.constants";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { rowsViewSlice } from "../../store/rows.slice";

type TRowItemProps = {
  row: TRow;
  level: number;
  edit: boolean;
};

export default function RowItem({ row, level, edit }: TRowItemProps) {
  const { id } = row;

  const [isEdit, setIsEdit] = useState<boolean>(edit);
  const [rowState, setRowState] = useState<TRow>(row);
  const [isLevelHover, setIsLevelHover] = useState<boolean>(false);

  const [updateRow] = smrApi.useUpdateRowMutation();
  const [createRow] = smrApi.useCreateRowInEntityMutation();
  const [deleteRow] = smrApi.useDeleteRowMutation();

  const dispatch = useAppDispatch();

  const handleSetIsEdit = () => {
    console.log("click");
    setIsEdit(true);
  };

  const handleChangeValue = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setRowState((prev) => ({
      ...prev,
      [name]: name === "rowName" ? value : Number(value),
    }));
  };

  const handleInputKeyPress = (evt: React.KeyboardEvent<HTMLElement>) => {
    if (evt.key === "Enter") {
      updateRow({ rID: id, updateData: rowState });
      dispatch(rowsViewSlice.actions.updateRow(rowState));
      setIsEdit(false);
    }
  };

  const handleCreateRow = async () => {
    newRow.parentId = id;
    try {
      const res = await createRow(newRow);
      if (res.data?.current) {
        dispatch(
          rowsViewSlice.actions.createRow({
            parentId: id,
            newRow: res.data?.current,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRow = () => {
    deleteRow(id);
    dispatch(rowsViewSlice.actions.deleteRow(id));
  };

  return (
    <>
      <div
        id={String(row.id)}
        className={styles.container}
        onDoubleClick={handleSetIsEdit}
      >
        <div
          onMouseEnter={() => setIsLevelHover(true)}
          onMouseLeave={() => setIsLevelHover(false)}
          className={clsx(styles.level, {
            [styles["level-hover"]]: isLevelHover,
          })}
          style={{ marginLeft: `${level * 10}px` }}
        >
          <DocumentIcon onClick={handleCreateRow} />
          {isLevelHover && <TrashIcon onClick={handleDeleteRow} />}
        </div>
        {/* Наименование работ */}
        <div className={styles.input} onDoubleClick={handleSetIsEdit}>
          <input
            name="rowName"
            value={rowState.rowName || ""}
            className={styles.input_name}
            disabled={!isEdit}
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
      {row.child && row.child.length > 0 && (
        <RowsAll rows={row.child} level={level + 1} />
      )}
    </>
  );
}
