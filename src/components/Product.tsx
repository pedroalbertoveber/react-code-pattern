import { Button } from "@mui/material";
import { Item } from "../entities/item";
import { useCartAdapter } from "../adapters/useCart";

interface ProductProps {
  item: Item;
}

export function Product({ item }: ProductProps) {
  const { addItem } = useCartAdapter();

  async function handleAddItem() {
    try {
      await addItem(item);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      <Button onClick={() => handleAddItem()}>Add to Cart</Button>
    </div>
  );
}
