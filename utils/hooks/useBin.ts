import { IBinFetched, IBin } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddBin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: IBin) => axios.post(`/api/bins`, event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bins"],
      });
    },
  });
};
//get bins
export const useGetBins = () => {
  return useQuery<IBinFetched[]>({
    queryKey: ["bins"],
    queryFn: () => axios.get("/api/bins").then((res) => res.data),
  });
};
//ediit bin
export const useEditBin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      event: Pick<IBinFetched, "name" | "_id" | "level" | "googleLocation">
    ) => axios.put(`/api/bins`, event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bins"],
      });
    },
  });
};
//delete bin
export const useDeleteBin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: Pick<IBinFetched, "_id">) =>
      axios.delete(`/api/bins`, { data: event }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bins"],
      });
    },
  });
};
