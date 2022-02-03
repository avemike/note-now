import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteSegment } from "../queries/segments";

export function useDeleteSegment(pk: number) {
  const queryClient = useQueryClient();

  return useMutation(
    ["deleteSegment"],
    async () => {
      await deleteSegment(pk);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["segments"]);
      },
      onError: () => {
        toast.error("Cannot delete a segment :(");
      },
    }
  );
}
