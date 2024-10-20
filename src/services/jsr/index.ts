export type JSRPlugin = {
  scope: string;
  name: string;
  latest: string;
  versions: {
    [version: string]: Record<string, never>;
  };
};

export type JSRModuleDetails = {
  scope: string;
  name: string;
  description: string;
  githubRepository: {
    id: number;
    owner: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };
  runtimeCompat: {
    browser: boolean;
    deno: boolean;
  };
  updatedAt: string;
  createdAt: string;
  versionCount: number;
  score: number;
  latestVersion: string;
  whenFeatured: string | null;
  isArchived: boolean;
};

type JSRResponse = {
  items: JSRModuleDetails[];
  total: number;
};

export const searchJSR = async (query: string): Promise<JSRModuleDetails[]> => {
  const response = await fetch(
    `https://api.jsr.io/packages?query=${query}&limit=10`
  );
  const data: JSRResponse = await response.json();
  return data.items as JSRModuleDetails[];
};

export const getJSRModuleDetails = async (
  scope: string,
  packageName: string
): Promise<JSRModuleDetails> => {
  const response = await fetch(
    `https://api.jsr.io/scopes/${scope}/packages/${packageName}`
  );
  const data: JSRModuleDetails = await response.json();
  return data;
};
