const requiredEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  thirdwebClientId: requiredEnv("NEXT_PUBLIC_THIRDWEB_CLIENT_ID"),
  graphEndpoint: requiredEnv("NEXT_PUBLIC_GRAPH_ENDPOINT"),
  backendUrl: requiredEnv("NEXT_PUBLIC_BACKEND_URL"),
  ipfsGateway: requiredEnv("NEXT_PUBLIC_IPFS_GATEWAY"),
};
