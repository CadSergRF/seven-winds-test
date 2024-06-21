export type TRow = {
    equipmentCosts: number,
    estimatedProfit: number,
    id: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    parentId?: number,
    rowName: number,
    salary: number,
    supportCosts: number,
    total?: number,
    child?: TRow
};

export type TRowCreate = Omit<TRow, 'id' | 'total' | 'child'>;

export type TCreateRowResponse = {
    current: TRow,
    changed: TRow[]
}

export type TRowUpdate = {
    rID: number,
    updateData: TRowCreate
}