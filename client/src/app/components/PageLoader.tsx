import { Box, CircularProgress } from "@mui/material";

export function PageLoader() {
  return (
    <Box
      height={"100vh"}
      width={"100vh"}
      position={"absolute"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress />
    </Box>
  );
}
