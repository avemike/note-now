import { Box, Typography } from "@mui/material";
import { useNotes } from "../../api/hooks/useNotes";
import { ContentWithNotesSidebar } from "../components/ContentWithNotesSidebar";

export function HomePage() {
  const { data: notes } = useNotes();

  // eslint-disable-next-line no-console
  console.log(notes);

  return (
    <ContentWithNotesSidebar notes={notes || []}>
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
