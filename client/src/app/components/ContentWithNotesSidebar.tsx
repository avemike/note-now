import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

const StyledTitle = styled(Typography)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const StyledSidebar = styled(Box)`
  width: 20%;
  padding: 4px;
`;

const StyledNote = styled(Box)<{ active: boolean }>`
  width: 100%;
  padding: 1rem 2rem;
  background: ${(props) => (props.active ? "#FFFA96" : "#fefaae")};
  border: 2px solid #000;
  box-shadow: ${(props) =>
    props.active ? "2px 2px 0 0 #000" : "4px 4px 0 0 #000"};
  transition: all 240ms;
  cursor: pointer;
`;

export function ContentWithNotesSidebar({
  notes,
  children,
}: {
  children: ReactNode;
  notes: { name: string; active: boolean }[];
}) {
  return (
    <Box width={"100%"} minHeight={"100vh"} display={"flex"}>
      <Box width={"80%"}>{children}</Box>
      <StyledSidebar>
        <StyledTitle variant="h5">Notes</StyledTitle>
        <Stack spacing={"2em"}>
          {notes.map((note) => (
            <StyledNote key={note.name} active={note.active}>
              <Typography
                variant="body2"
                fontWeight={600}
                letterSpacing={"0.5px"}
              >
                {note.name}
              </Typography>
            </StyledNote>
          ))}
        </Stack>
      </StyledSidebar>
    </Box>
  );
}
