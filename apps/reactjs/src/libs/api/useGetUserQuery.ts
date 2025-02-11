import type { User } from "@packages/libs";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "./config";

export const useGetUserQuery = (): UseQueryResult<User> => {
  const retrieveUser = async (): Promise<User> => {
    const response = await api.get("/");
    return response.data;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: retrieveUser,
  });
};
