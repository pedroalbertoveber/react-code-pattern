// import useSWR from "swr";

// type UseQueryParams<T> = {
//   url: string;
//   fetcher: () => Promise<T>;
//   refreshInterval?: number;
// };

// export function useQuery<T>({
//   fetcher,
//   url,
//   refreshInterval,
// }: UseQueryParams<T>) {
//   const data = useSWR<T>(url, fetcher, {
//     refreshInterval,
//   });

//   return data;
// }
