import { AppBar, Toolbar, Typography, Badge, IconButton, Box, Button, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";

const Header = () => {
  //  const cartItems = useSelector((state) => state.cart.items);
  //  const totalQty = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  //  const navigate = useNavigate();
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const totalQty = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());       //  clear auth from Redux
    dispatch(clearCart());    //  clear cart from Redux
    navigate("/login");  
  }     //  redirect to login

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#1a1a2e", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <ShoppingBagIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700}>
            E-BaZar
          </Typography>
          {/* sx={{ flexGrow: 1 }} */}
        </Box>

        {/* Right side  */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>


        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={totalQty} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar> */}
        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Cart always visible */}
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={totalQty} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {user ? (
            <>
              {/* ── User Avatar + Name ── */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#e53935",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", display: { xs: "none", sm: "block" } }}
                >
                  {user.name}
                </Typography>
              </Box>

              {/* ── Logout ── */}
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              {/* ── Login / Register Buttons ── */}
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ color: "#fff", textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/register")}
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#e53935",
                    borderColor: "#e53935",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
