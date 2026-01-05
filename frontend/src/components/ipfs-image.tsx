"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { getIpfsFallbacks, ipfsToHttp } from "@/lib/ipfs";

type IpfsImageProps = {
  cid: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function IpfsImage({
  cid,
  alt,
  className,
  fill,
  width,
  height,
}: IpfsImageProps) {
  const fallbacks = useMemo(() => [ipfsToHttp(cid), ...getIpfsFallbacks(cid)], [cid]);
  const [index, setIndex] = useState(0);

  const src = fallbacks[index];

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      loading="lazy"
      onError={() => {
        if (index < fallbacks.length - 1) {
          setIndex(index + 1);
        }
      }}
    />
  );
}
