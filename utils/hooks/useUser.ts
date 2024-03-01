import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User, UserFetched, IWorkerFetched, Worker } from "@/types";
export const useAddUser = () => {
  return useMutation({
    mutationFn: (user: User): Promise<void> => axios.post("/api/user", user),
  });
};
export const useAddWorker = () => {
  return useMutation({
    mutationFn: (user: Worker): Promise<void> => axios.post("/api/user", user),
  });
};
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: Partial<UserFetched>) => axios.put(`/api/user`, user),
  });
};
//get all users
export const useGetWorkers = () => {
  return useQuery<IWorkerFetched[]>({
    queryKey: ["workers"],
    queryFn: () => axios.get("/api/user/all").then((res) => res.data),
  });
};
//edit worker
export const useEditWorker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: { location: string; _id: string }) =>
      axios.put(`/api/user`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workers"],
      });
    },
  });
};
