const requiredEnv = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  thirdwebClientId: requiredEnv(
    process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    "NEXT_PUBLIC_THIRDWEB_CLIENT_ID",
  ),
  graphEndpoint: requiredEnv(
    process.env.NEXT_PUBLIC_GRAPH_ENDPOINT,
    "NEXT_PUBLIC_GRAPH_ENDPOINT",
  ),
  backendUrl: requiredEnv(
    process.env.NEXT_PUBLIC_BACKEND_URL,
    "NEXT_PUBLIC_BACKEND_URL",
  ),
  ipfsGateway: requiredEnv(
    process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    "NEXT_PUBLIC_IPFS_GATEWAY",
  ),
};
