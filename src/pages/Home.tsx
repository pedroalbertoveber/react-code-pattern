import { useEffect } from "react";

import { Stack, Typography } from "@mui/material";
import { useItemsContext } from "../contexts/ItemsContext";

export function Home() {
  const { getAndSetCache } = useItemsContext();

  useEffect(() => {
    getAndSetCache.execute();
  }, []);

  return (
    <Stack>
      <Typography>Home</Typography>
    </Stack>
  );
}
