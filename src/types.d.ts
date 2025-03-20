declare module "*.jpg";
declare module 'eslint-plugin-import-newlines';

type AnyObject = { [key: string]: any };

type Parent = Readonly<{ children: ReactNode }>;
type DefaultValue<T> = Readonly<{ defaultValue: T }>;
