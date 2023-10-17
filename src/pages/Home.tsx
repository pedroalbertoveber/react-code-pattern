import { Box, Grid } from "@mui/material";
import { Product } from "../components/Product";
import { CartProvider } from "../contexts/CartContext";
import { Item } from "../entities/item";
import { ShoppingCart } from "../components/ShoppingCart";

export function Home() {
  const sampleItem = new Item(Math.random(), "Sample Product", 10.99);

  return (
    <CartProvider>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex' }}>
            <Product item={sampleItem} />
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
