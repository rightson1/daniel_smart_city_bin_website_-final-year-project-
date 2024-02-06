import { ILocationFetched, Location } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: Location) => axios.post(`/api/locations`, event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
//get locations
export const useGetLocations = () => {
  return useQuery<ILocationFetched[]>({
    queryKey: ["locations"],
    queryFn: () => axios.get("/api/locations").then((res) => res.data),
  });
};
//ediit location
export const useEditLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: Pick<ILocationFetched, "name" | "_id">) =>
      axios.put(`/api/locations`, event),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
//delete location
export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: Pick<ILocationFetched, "_id">) =>
      axios.delete(`/api/locations`, { data: event }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
