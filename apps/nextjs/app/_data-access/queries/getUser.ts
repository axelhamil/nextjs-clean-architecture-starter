import type { User } from "@packages/libs";

export const getUser = async (): Promise<{
  data: User;
  status: number;
}> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return {
    data: await response.json(),
    status: response.status,
  };
};
