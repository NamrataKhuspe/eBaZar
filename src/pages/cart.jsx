import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";



const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);

  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );
  const totalQty = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // ── Empty Cart ──
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <Container sx={{ textAlign: "center", py: 12 }}>
          <ShoppingBagIcon sx={{ fontSize: 80, color: "#ddd" }} />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mt: 2, color: "#1a1a2e" }}
          >
            Your cart is empty
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", mb: 3 }}>
            Looks like you haven't added anything yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#1a1a2e",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Continue Shopping
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container sx={{ py: 5 }}>
        {/* ── Page Title ── */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ mb: 4, color: "#1a1a2e" }}
        >
          Shopping Cart
          <Typography
            component="span"
            variant="body1"
            sx={{ color: "#999", ml: 1 }}
          >
            ({totalQty} items)
          </Typography>
        </Typography>

        <Grid container spacing={4}>
          {/* ── Left: Cart Items ── */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Product Image */}
                <Box
                  component="img"
                  src={item.imgUrl}
                  alt={item.productName}
                  sx={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />

                {/* Product Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={700} sx={{ color: "#1a1a2e" }}>
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
                    {item.category}
                  </Typography>
                  <Typography fontWeight={800} sx={{ color: "#e53935" }}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </Box>

                {/* Quantity Controls */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(decreaseQty(item.id))}
                    sx={{ border: "1px solid #eee", borderRadius: 2 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    fontWeight={700}
                    sx={{ minWidth: 24, textAlign: "center" }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(increaseQty(item.id))}
                    sx={{ border: "1px solid #eee", borderRadius: 2 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Delete Button */}
                <IconButton
                  onClick={() => dispatch(removeFromCart(item.id))}
                  sx={{ color: "#e53935" }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Paper>
            ))}

            {/* Clear Cart */}
            <Button
              variant="text"
              onClick={() => dispatch(clearCart())}
              sx={{ color: "#e53935", textTransform: "none", mt: 1 }}
            >
              Clear Cart
            </Button>
          </Grid>

          {/* ── Right: Order Summary ── */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                position: "sticky",
                top: 80,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ mb: 2, color: "#1a1a2e" }}
              >
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Subtotal ({totalQty} items)
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  ₹{totalPrice.toLocaleString()}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Shipping
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "green" }}
                >
                  FREE
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{ color: "#e53935" }}
                >
                  ₹{totalPrice.toLocaleString()}
                </Typography>
              </Box>

              {/* <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#1a1a2e",
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#e53935" },
                }}
              >
                Proceed to Checkout
              </Button> */}
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  if (!user) {
                    navigate("/login"); // not logged in -> go to login
                  } else {
                    navigate("/checkout"); // logged in -> go to checkout
                  }
                }}
                sx={{
                  backgroundColor: "#1a1a2e",
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#e53935" },
                }}
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/")}
                sx={{
                  mt: 1.5,
                  borderColor: "#1a1a2e",
                  color: "#1a1a2e",
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.5,
                }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
