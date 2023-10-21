import { MergeConfigurationsParams } from "../@types";

export function mergeConfigurations({
  configuration,
  config = null,
}: MergeConfigurationsParams) {
  const merged = {
    ...configuration,
    ...config,
    headers: {
      ...configuration.headers,
      ...config?.headers,
    },
  };
  return merged;
}