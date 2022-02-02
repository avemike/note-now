import { useQuery } from "react-query";
import { getNotes } from "../queries/notes";

interface Note {
  fields: {
    name: string;
  };
}

export function useNotes() {
  return useQuery(
    "notes",
    () => getNotes().then((res) => JSON.parse(res?.data) as Note[]),
    {
      refetchIntervalInBackground: true,
      refetchInterval: 5000,
    }
  );
}
