export default interface Product {
  _id?: string,
  name: string,
  price: number,
}

export type ProductCartItem = {
  item: Product,
  count: number
};
export type ProductCart = ProductCartItem[];
