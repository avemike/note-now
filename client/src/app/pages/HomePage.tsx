/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import styled from "@emotion/styled";
import { Container, Box, Typography } from "@mui/material";
import { useNotes } from "../../api/hooks/useNotes";
import { usePostSegment } from "../../api/hooks/usePostSegment";
import { useSegments } from "../../api/hooks/useSegments";
import { ContentWithNotesSidebar } from "../components/ContentWithNotesSidebar";
import { CreateSegment } from "../components/CreateSegment";
import { EditableSegment } from "../components/EditableSegment";

const StyledTitle = styled(Typography)`
  text-transform: uppercase;
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

  const { mutate: postSegment } = usePostSegment(notes?.[active].pk || 0);
  const parsedSegments = (segments || []).map((segment) => ({
    ...segment.fields,
    pk: segment.pk,
  }));

  const title = parsedNotes[active]?.name ?? "None";

  return (
    <ContentWithNotesSidebar notes={parsedNotes} setActive={setActive}>
      <Box>
        <Container maxWidth="md">
          <Box padding={"4rem 0"}>
            <StyledTitle variant="h2" marginBottom={"4rem"}>
              {title}
            </StyledTitle>
            <CreateSegment
              order={
                (parsedSegments[parsedSegments.length - 1]?.order || -1) + 1
              }
              postSegment={postSegment}
            />
            {parsedSegments.map((data) => (
              <EditableSegment data={data} key={data.order} />
            ))}
          </Box>
        </Container>
      </Box>
    </ContentWithNotesSidebar>
  );
}
