import { TRow } from '../../utils/Types/smr.types';
import RowItem from '../RowItem/RowItem';

type TRowsAllProps = {
    rows: TRow[] | undefined;
    level: number;
}

export default function RowsAll({ rows, level }: TRowsAllProps) {

  return (
    <>
    {rows && rows?.length > 0 && rows.map((row) => <RowItem key={row.id} row={row} level={level} edit={false}/>)}
    </>
  )
}