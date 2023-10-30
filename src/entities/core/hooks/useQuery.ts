import {
  UndefinedInitialDataOptions,
  useQuery as useTanstackQuery,
} from "@tanstack/react-query";

type UseQueryParams<T> = {
  queryKey: string;
  fetcher: () => Promise<T>;
  queryConfig?: Omit<UndefinedInitialDataOptions<T>, 'queryKey'>;
};

export function useQuery<ReturnType = unknown>({
  fetcher,
  queryKey,
  queryConfig,
}: UseQueryParams<ReturnType>) {
  const response = useTanstackQuery<ReturnType>({
    ...queryConfig,
    queryKey: [queryKey],
    queryFn: fetcher,
  });

  return response;
}
