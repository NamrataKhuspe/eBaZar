import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const ProductCard = ({ item, badge }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () =>{
    dispatch(
      addToCart({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
        category: item.category,
      }),
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.13)",
        },
        position: "relative",
        overflow: "visible",
      }}
    >
      {/* Badge */}
      {badge && (
        <Chip
          label={badge}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1,
            backgroundColor: badge === "NEW" ? "#1a237e" : "#e53935",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: 1,
            borderRadius: 1,
          }}
        />
      )}

      {/* Image */}
      <Box sx={{ overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
        <CardMedia
          component="img"
          height="180"
          image={item.imgUrl}
          alt={item.productName}
          sx={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
            "&:hover": { transform: "scale(1.06)" },
          }}
        />
      </Box>

      <CardContent sx={{ px: 2, pb: "16px !important" }}>
        {/* Category */}
        <Typography
          variant="caption"
          sx={{ color: "#999", textTransform: "uppercase", letterSpacing: 1 }}
        >
          {item.category || "Product"}
        </Typography>

        {/* Name */}
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{
            color: "#1a1a2e",
            mt: 0.3,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.productName}
        </Typography>

        {/* Price row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ color: "#e53935" }}>
            ₹{item.price}
          </Typography>
          {item.oldPrice && (
            <Typography
              variant="body2"
              sx={{ color: "#bbb", textDecoration: "line-through" }}
            >
              ₹{item.oldPrice}
            </Typography>
          )}
        </Box>

        {/* Add to Cart */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            backgroundColor: "#1a1a2e",
            color: "#fff",
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 600,
            "&:hover": { backgroundColor: "#e53935" },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
