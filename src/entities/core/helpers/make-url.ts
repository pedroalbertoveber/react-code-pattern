import { MakeUrlParams } from "../@types";

export function makeUrl({ method = null, url = null }: MakeUrlParams) {
  const apiUrl = "http://localhost:3333/";
  const baseUrl = apiUrl + (url);
  const _url = method ? baseUrl + "/" + method : baseUrl;
  return _url;
}