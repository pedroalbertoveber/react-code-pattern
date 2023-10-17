import { useQuery } from '@tanstack/react-query';

interface QueryAdapterProps {
  queryKey: string[];
  queryFn: () => Promise<unknown>;
}

export const useQueryAdapter = ({ queryKey, queryFn }: QueryAdapterProps) => {
  return useQuery({
    queryKey,
    queryFn
  });
};
