import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "@/lib/axios";

async function updatedUser(url, extraInfo) {
  const {
    arg: { userId, formData },
  } = extraInfo;

  await axios.put(`${url}/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Required for file uploads
    },
  });
}

export function useUser() {
  const { data, error, isLoading } = useSWR("/user");
  const { trigger: userUpdate, isMutating: isUpdating } = useSWRMutation(
    "/user",
    updatedUser
  );

  const isUserLoading = isLoading || isUpdating;

  return {
    user: data,
    isLoading,
    isError: error,
    userUpdate,
    isUpdating,
    isUserLoading,
  };
}
