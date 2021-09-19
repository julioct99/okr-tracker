export interface OkrItem {
  date: Date;
  value: number;
}

export const defaultOkrItem: OkrItem = {
  date: new Date(),
  value: 0,
};
