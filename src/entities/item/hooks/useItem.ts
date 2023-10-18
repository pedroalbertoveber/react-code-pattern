import { useState } from "react";

export function useItem<Props>(initialValue: Props) {
  const [items, setItems] = useState<Props>(initialValue)

  return {
    items,
    setItems
  }
}