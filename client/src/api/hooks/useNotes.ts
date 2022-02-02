import { useQuery } from "react-query";
import { getNotes } from "../queries/notes";

export function useNotes() {
  return useQuery(
    "notes",
    () => getNotes().then((res) => JSON.parse(res?.data)),
    {
      refetchIntervalInBackground: true,
      refetchInterval: 5000,
    }
  );
}
