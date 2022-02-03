import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { postNote } from "../queries/notes";

export function usePostNote() {
  const queryClient = useQueryClient();

  return useMutation(
    "postNote",
    async (name: string) => {
      await postNote(name);
    },
    {
      onSuccess: () => {
        toast.success("Successfully created a note!");
        queryClient.invalidateQueries("notes");
      },
      onError: () => {
        toast.error("Cannot create a note :(");
      },
    }
  );
}
