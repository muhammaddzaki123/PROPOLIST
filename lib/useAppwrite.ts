import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";
import type { UseAppwriteOptions, UseAppwriteReturn } from "./types";

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams?: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
    // Menambahkan dependencies yang diperlukan
  }, [fetchData, params, skip]);

  const refetch = async (newParams?: P) => await fetchData(newParams);

  return { data, loading, error, refetch };
};
