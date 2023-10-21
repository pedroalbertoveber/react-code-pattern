import { CustomRequestRespose } from "../@types";

interface VerifyIfIsCustomRequestProps {
  custom: any;
  baseUrl: string;
  cachePath: string;
}

export function verifyIfIsCustomRequest({ baseUrl, cachePath, custom }: VerifyIfIsCustomRequestProps): CustomRequestRespose {
  if (custom) {
    return {
      url: custom.url || baseUrl,
      cachePath: custom.cachePath || cachePath,
    };
  }
  return {
    url: baseUrl,
    cachePath: cachePath,
  };
}