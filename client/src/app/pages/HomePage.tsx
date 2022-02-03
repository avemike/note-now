import { useState } from "react";
import styled from "@emotion/styled";
import { Container, Box, Typography, TextareaAutosize } from "@mui/material";
import { useNotes } from "../../api/hooks/useNotes";
import { useSegments } from "../../api/hooks/useSegments";
import { ContentWithNotesSidebar } from "../components/ContentWithNotesSidebar";

const StyledTitle = styled(Typography)`
  text-transform: uppercase;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 18px;
  border: transparent;
  resize: none;
  font-family: "Roboto";
`;

export function HomePage() {
  const [active, setActive] = useState(0);
  const { data: notes } = useNotes();

  const { data: segments } = useSegments({
    note: notes?.[active]?.pk || 0,
    enabled: notes?.[active]?.pk != null,
  });

  const parsedNotes = (notes || []).map((note, index) => ({
    ...note.fields,
    active: index === active,
  }));

  const parsedSegments = (segments || []).map((segment) => segment.fields);

  const title = parsedNotes[active]?.name ?? "None";

  return (
    <ContentWithNotesSidebar notes={parsedNotes} setActive={setActive}>
      <Box>
        <Container maxWidth="md">
          <Box padding={"4rem 0"}>
            <StyledTitle variant="h2">{title}</StyledTitle>
            {parsedSegments.map((data) => (
              <StyledTextArea
                key={data.order}
                value={data.content}
                minRows={3}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </ContentWithNotesSidebar>
  );
}
