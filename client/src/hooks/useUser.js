import useSWR from "swr";

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR("/user");

  return {
    user: data,
    isLoading,
    isError: error,
    userMutate: mutate,
  };
}
