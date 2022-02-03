import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { patchSegment } from "../queries/segments";

export function usePostSegment(pk: number) {
  const queryClient = useQueryClient();

  return useMutation(
    ["patchSegment"],
    async ({ content }: { content: string }) => {
      await patchSegment({ content, pk });
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
