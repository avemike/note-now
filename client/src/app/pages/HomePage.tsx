import { useState } from "react";
import styled from "@emotion/styled";
import { Container, Box, Typography } from "@mui/material";
import { useNotes } from "../../api/hooks/useNotes";
import { ContentWithNotesSidebar } from "../components/ContentWithNotesSidebar";

const StyledTitle = styled(Typography)`
  text-transform: uppercase;
`;
export function HomePage() {
  const [active, setActive] = useState(0);
  const { data: notes } = useNotes();

  const parsedNotes = (notes || []).map((note, index) => ({
    ...note.fields,
    active: index === active,
  }));

  const title = parsedNotes[active]?.name ?? "None";

  return (
    <ContentWithNotesSidebar notes={parsedNotes} setActive={setActive}>
      <Box>
        <Container maxWidth="md">
          <Box padding={"4rem 0"}>
            <StyledTitle variant="h2">{title}</StyledTitle>
          </Box>
        </Container>
      </Box>
    </ContentWithNotesSidebar>
  );
}
