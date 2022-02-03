import { useQuery } from "react-query";
import { getSegments } from "../queries/segments";

interface Segment {
  fields: {
    content: string;
    order: string;
  };
}

export function useSegments({
  note,
  enabled = true,
}: {
  note: number;
  enabled?: boolean;
}) {
  return useQuery(
    ["segments", { note }],
    () => getSegments(note).then((res) => JSON.parse(res?.data) as Segment[]),
    {
      refetchIntervalInBackground: true,
      refetchInterval: 15000,
      enabled,
    }
  );
}
