// import localforage from "localforage";

type SetCacheProps<Attributes> = {
  key: string;
  value: Attributes
}

type GetCacheProps = {
  key: string;
}

export function set<Attributes>({ key, value }: SetCacheProps<Attributes>): void {
  if (typeof window !== "undefined") {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }
}

export function get<Attributes>({ key }: GetCacheProps): Attributes | null {
  if (typeof window === "undefined") return null;

  const cachedData = localStorage.getItem(key);
  if (!cachedData) {
    return null;
  }
  const parsedData = JSON.parse(cachedData) as Attributes;
  return parsedData;
}

// export async function getLocalStorage(key: string) {
//   return await localforage.getItem(key).then((res) => {
//     return res;
//   });
// }
