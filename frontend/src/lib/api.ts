import { env } from "./env";

type ApiError = {
  message: string;
  code?: string;
};

const parseError = async (response: Response): Promise<ApiError> => {
  try {
    const data = (await response.json()) as Partial<ApiError>;
    return { message: data.message ?? "Request failed", code: data.code };
  } catch {
    return { message: "Request failed" };
  }
};

export const apiFetch = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  const isFormData = options?.body instanceof FormData;
  const response = await fetch(`${env.backendUrl}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await parseError(response);
    throw new Error(error.message);
  }

  return (await response.json()) as T;
};
