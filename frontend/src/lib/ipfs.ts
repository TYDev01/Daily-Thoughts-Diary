import { env } from "./env";

const FALLBACK_GATEWAYS = ["https://ipfs.io/ipfs/", "https://cloudflare-ipfs.com/ipfs/"];

const normalizeGateway = (gateway: string) =>
  gateway.endsWith("/") ? gateway : `${gateway}/`;

export const ipfsToHttp = (cid: string) => {
  const clean = cid.replace("ipfs://", "");
  return `${normalizeGateway(env.ipfsGateway)}${clean}`;
};

export const getIpfsFallbacks = (cid: string) => {
  const clean = cid.replace("ipfs://", "");
  return FALLBACK_GATEWAYS.map((gateway) => `${normalizeGateway(gateway)}${clean}`);
};
