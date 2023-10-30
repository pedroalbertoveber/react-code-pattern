import { Stack, Typography } from "@mui/material";
import { useItemsContext } from "../contexts/ItemsContext";
import { Link } from "react-router-dom";

export function Home() {
  const { getAllItems } = useItemsContext();
  const { data: items } = getAllItems.execute();

  if (!items) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Stack width="100%">
      {items.map((item) => {
        return (
          <Stack
            key={item.id}
            flexDirection="row"
            padding="2rem"
            border="thin"
            borderRadius="6px"
            gap="1rem"
          >
            <Typography>{item.name}: </Typography>
            <Typography>{item.price}</Typography>

            <Typography>
              <Link to={`/item/${item.id}`}>Ver detalhes</Link>
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
