import slugify from "slugify";

export type SlugifyOptions = {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
};

export const createSlug = (value: string, options?: SlugifyOptions): string => {
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
    ...options,
  });
};
