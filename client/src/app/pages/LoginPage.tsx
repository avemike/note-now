import { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@mui/material";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";
import { PageLoader } from "../components/PageLoader";

const StyledFormControl = styled(FormControl)`
  margin: 2em 0;
`;

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const { isLoading, refetch: login } = useQuery(
    "login",
    () => auth.login(email, password),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      onError: () => {
        toast.error("Login failed");
      },
    }
  );

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      {isLoading && <PageLoader />}
      <Stack
        minWidth={"400px"}
        maxHeight={"800px"}
        width={"30%"}
        padding={"4em 4em 8em 4em"}
        spacing={"4em"}
      >
        <FormGroup>
          <StyledFormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="email">Write your email</FormHelperText>
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="password">Write your password</FormHelperText>
          </StyledFormControl>
        </FormGroup>

        <Button variant="outlined" onClick={() => login()}>
          Login
        </Button>
      </Stack>
    </Box>
  );
}
