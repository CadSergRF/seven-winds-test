import { TRow } from '../../utils/Types/smr.types';
import RowItem from '../RowItem/RowItem';

// import styles from './RowsAll.module.scss';

type TRowsAllProps = {
    rows: TRow[] | undefined;
    level: number;
}

export default function RowsAll({ rows, level }: TRowsAllProps) {

  console.log(rows)

  return (
    <>
    {rows?.map((row) => <RowItem key={row.id} row={row} level={level}/>)}
    </>
  )
}