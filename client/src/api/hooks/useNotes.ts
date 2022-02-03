import { useQuery } from "react-query";
import { getNotes } from "../queries/notes";

interface Note {
  pk: number;
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
      refetchInterval: 15000,
    }
  );
}
