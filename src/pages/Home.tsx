import { Box, Grid } from "@mui/material";
import { Product } from "../components/Product";
import { CartProvider } from "../contexts/CartContext";
import { ShoppingCart } from "../components/ShoppingCart";
import { useGetItems } from "../adapters/useItem";

export function Home() {

  const { data } = useGetItems();
  return (
    <CartProvider>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex' }}>
            {
              data?.map((item) => (
                <Product key={item.id} item={item} />
              ))
            }
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex' }}>
            <ShoppingCart />
          </Box>
        </Grid>
      </Grid>
    </CartProvider>
  );
}
