import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

// Define the shape of our API response
type ApiResponse<T> = {
  data: T | undefined;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<UseQueryResult<T, Error>>;
};

// Define the shape of our API error response
interface ApiError extends Error {
  message: string;
  status?: number;
  response?: {
    status: number;
    data: any;
  };
}

// Helper function to handle API errors
const handleApiError = (error: unknown): never => {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as { response?: { status: number; data?: { message?: string } } };
    throw {
      message: apiError.response?.data?.message || 'An error occurred',
      status: apiError.response?.status,
    } as ApiError;
  } else if (error && typeof error === 'object' && 'request' in error) {
    throw new Error('No response from server. Please check your connection.');
  }
  throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
};

// Generic hook for fetching data from an API
export const useApiData = <T>(
  queryKey: (string | number)[],
  url: string,
  enabled: boolean = true,
  options: Omit<UseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'> = {}
): ApiResponse<T> => {
  const fetchData = async (): Promise<T> => {
    try {
      const response = await fetch(url, {
        ...(options as RequestInit),
        headers: {
          'Content-Type': 'application/json',
          ...(options as RequestInit)?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw {
          response: {
            status: response.status,
            data: error,
          },
        };
      }

      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  };

  const { data, error, isLoading, isError, refetch } = useQuery<T, ApiError>({
    queryKey,
    queryFn: fetchData,
    enabled,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });

  return {
    data,
    error: error?.message || null,
    isLoading,
    isError,
    refetch,
  };
};

// Define types for weather data
interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    weathercode: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    weathercode: number[];
  };
  daily_units: {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// Example usage with a specific API
export const useWeatherData = (location: string = 'london') => {
  return useApiData<WeatherData>(
    ['weather', location],
    `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`,
    true,
    {
      // 1 hour cache time for weather data
      staleTime: 60 * 60 * 1000,
    }
  );
};

// Define types for cryptocurrency data
interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  };
  last_updated: string;
}

// Example usage with cryptocurrency data
export const useCryptoData = (coinId: string = 'bitcoin') => {
  return useApiData<CryptoData>(
    ['crypto', coinId],
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    true,
    {
      // 5 minute cache time for crypto data
      staleTime: 5 * 60 * 1000,
    }
  );
};
