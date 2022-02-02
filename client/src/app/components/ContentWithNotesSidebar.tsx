import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

const StyledSidebar = styled(Box)`
  width: 20%;
  background: #1c64f2;
  color: white;
`;
const StyledNote = styled(Box)`
  width: 100%;
  padding: 1rem 2rem;
`;

export function ContentWithNotesSidebar({
  notes,
  children,
}: {
  children: ReactNode;
  notes: { fields: { name: string } }[];
}) {
  // eslint-disable-next-line no-console
  console.log(notes[0]);

  return (
    <Box width={"100%"} minHeight={"100vh"} display={"flex"}>
      <Box width={"80%"}>{children}</Box>
      <StyledSidebar>
        <Typography variant="h5" padding={"0.5rem 1rem"}>
          Notes
        </Typography>
        <Stack spacing={"2em"}>
          {notes.map((note) => (
            <StyledNote key={note.fields.name}>
              <Typography variant="body1" fontWeight={500}>
                {note.fields.name}
              </Typography>
            </StyledNote>
          ))}
        </Stack>
      </StyledSidebar>
    </Box>
  );
}
