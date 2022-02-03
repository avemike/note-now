import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { postSegment } from "../queries/segments";

export function usePostSegment(note: number) {
  const queryClient = useQueryClient();

  return useMutation(
    ["postSegment", { note }],
    async ({ content, order }: { content: string; order: number }) => {
      await postSegment({ content, order, note });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["segments"]);
      },
      onError: () => {
        toast.error("Cannot create a segment :(");
      },
    }
  );
}
