import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNotes } from "../../api/hooks/useNotes";
import { ContentWithNotesSidebar } from "../components/ContentWithNotesSidebar";

export function HomePage() {
  const [active, _setActive] = useState(0);
  const { data: notes } = useNotes();

  const parsedNotes = (notes || []).map((note, index) => ({
    ...note.fields,
    active: index === active,
  }));

  return (
    <ContentWithNotesSidebar notes={parsedNotes}>
      <Box
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h1">Home Page</Typography>
      </Box>
    </ContentWithNotesSidebar>
  );
}
