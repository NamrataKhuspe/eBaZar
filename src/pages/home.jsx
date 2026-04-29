import { Grid, Container, Paper,Button, Typography, Box } from "@mui/material";
import ProductCard from "../components/productCard/productCard";
import { products, SliderData } from "../assets/data/products.js";
import  Header  from "../components/header/header";
import Footer from "../components/footer/footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";


const Home = () => {
  return (
    <>
      <Header />
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay={true}
        interval={2000}
        transitionTime={0}
        stopOnHover={false}
        useKeyboardArrows
      >
        {SliderData.map((item) => (
          <div
            key={item.id}
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#f0f2f0", // light grey-green like screenshot
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8%",
              boxSizing: "border-box",
            }}
          >
            {/* ── LEFT: Text ── */}
            <div
              style={{
                flex: 1,
                textAlign: "left",
                paddingRight: "4%",
              }}
            >
              <Typography
                variant="h2"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#1a1a1a",
                  lineHeight: 1.15,
                  marginBottom: "1.2rem",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body1"
                style={{
                  color: "#555",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                  maxWidth: "480px",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                {item.desc}
              </Typography>

              <Button
                variant="text"
                style={{
                  color: "#1a1a1a",
                  fontSize: "1rem",
                  textTransform: "none",
                  padding: 0,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Visit Collections
              </Button>
            </div>

            {/* ── RIGHT: Image ── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={item.cover}
                alt={item.title}
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain", // keeps product cut-out clean
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>

      {/* <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <ProductCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* ── Big Discount Section ── */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: 6 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "#e53935", fontWeight: 700, letterSpacing: 2 }}
              >
                Limited Time
              </Typography>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ color: "#1a1a2e" }}
              >
                Big Discounts 🔥
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1a1a2e",
                color: "#1a1a2e",
                textTransform: "none",
                borderRadius: 3,
              }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {products.slice(0, 6).map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
                <ProductCard item={item} badge="SALE" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── New Arrivals Section ── */}
      <Box sx={{ backgroundColor: "#fff", py: 6 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "#1a237e", fontWeight: 700, letterSpacing: 2 }}
              >
                Just Landed
              </Typography>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ color: "#1a1a2e" }}
              >
                New Arrivals ✨
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#1a1a2e",
                color: "#1a1a2e",
                textTransform: "none",
                borderRadius: 3,
              }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {products.slice(6, 12).map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
                <ProductCard item={item} badge="NEW" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Home;


