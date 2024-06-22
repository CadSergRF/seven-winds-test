import { TRow } from "./Types/smr.types";

export function recursiveDelete(list: TRow[], rId: number) {
  return list
    .map((item) => {
      return { ...item };
    })
    .filter((item) => {
      if ("child" in item) {
        item.child = recursiveDelete(item.child as TRow[], rId);
      }
      return item.id !== rId;
    });
}

export function recursiveUpdate(list: TRow[], row: TRow) {
  return list
    .map((item) => {
      return { ...item };
    })
    .filter((item) => {
      if (item.id === row.id) {
        Object.assign(item, row)
      }
      if ("child" in item) {
        item.child = recursiveUpdate(item.child as TRow[], row);
      }
      return item.id;
    });
}

export function recursiveCreate(list: TRow[], parentId: number | null, newRow: TRow) {
  return list
    .map((item) => {
      console.log('item ', item)
      console.log('parentId ', parentId)
      if (item.id === parentId) {
        if (!item.child) {
          item['child'] = []
        }
        item.child.push(newRow)
        
      console.log('item ', item)
      }
      if ("child" in item) {
        item.child = recursiveCreate(item.child as TRow[], parentId, newRow);
      }
      return item;
    });
}