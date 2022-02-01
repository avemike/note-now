import { Box, CircularProgress, Typography } from "@mui/material";

export function NotFoundPage() {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h1">Page not found</Typography>
    </Box>
  );
}
