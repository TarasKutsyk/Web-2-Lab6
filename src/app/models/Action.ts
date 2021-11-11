export const Action = {
  Create: 0,
  Update: 1,
  Delete: 2,
  UpdateReady: 3,
  AddToCart: 4
} as const;

export type ActionType = typeof Action[keyof typeof Action];
