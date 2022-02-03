import { useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Login } from "./Login";
import { Register } from "./Register";

const modes = {
  LOGIN: "login",
  REGISTER: "register",
} as const;

const StyledModePickWrapper = styled(Box)<{ active: boolean }>`
  padding: 0.25rem 1rem;

  cursor: pointer;
  border-bottom: ${({ active }) =>
    active ? "2px solid red" : "2px solid transparent"};
  transition: border 240ms;
`;

export function TabLookup({
  mode,
}: {
  mode: typeof modes[keyof typeof modes];
}) {
  return {
    [modes.LOGIN]: <Login />,
    [modes.REGISTER]: <Register />,
  }[mode];
}
export function WelcomePage() {
  const [mode, setMode] = useState<typeof modes[keyof typeof modes]>(
    modes.LOGIN
  );

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <Box
        display={"flex"}
        width={"calc(400px + 4rem)"}
        marginBottom={"2rem"}
        boxSizing={"border-box"}
      >
        <StyledModePickWrapper
          active={mode === modes.LOGIN}
          onClick={() => setMode(modes.LOGIN)}
        >
          <Typography variant="body1">Login</Typography>
        </StyledModePickWrapper>
        <StyledModePickWrapper
          active={mode === modes.REGISTER}
          onClick={() => setMode(modes.REGISTER)}
        >
          <Typography variant="body1">Register</Typography>
        </StyledModePickWrapper>
      </Box>
      <TabLookup mode={mode} />
    </Box>
  );
}
