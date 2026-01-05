import { env } from "./env";

export type GraphResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export const graphFetch = async <T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> => {
  const response = await fetch(env.graphEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Graph request failed");
  }

  const payload = (await response.json()) as GraphResponse<T>;
  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message ?? "Graph request failed");
  }

  if (!payload.data) {
    throw new Error("Graph request returned no data");
  }

  return payload.data;
};

export const USER_OVERVIEW_QUERY = `
  query UserOverview($user: String!) {
    user(id: $user) {
      id
      premium
      freeImageUploadsUsed
      lastRewardTimestamp
    }
    volumes(where: { user: $user }, orderBy: timestamp, orderDirection: desc) {
      id
      cid
      timestamp
    }
    entries(where: { user: $user }, orderBy: timestamp, orderDirection: desc) {
      id
      cid
      timestamp
      images
      text
    }
  }
`;
