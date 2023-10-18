import { Stack, Typography } from "@mui/material";
import { useItemsContext } from "../contexts/ItemsContext";
import { useEffect } from "react";

export function Home() {
  const { getAllItems, ItemEntity } = useItemsContext();

  console.log(ItemEntity.hooks.useItem.items)

  useEffect(() => {
    getAllItems.execute()
  }, []);

  return (
    <Stack>
      <Typography>
        Home
      </Typography>
    </Stack>
  );
}
