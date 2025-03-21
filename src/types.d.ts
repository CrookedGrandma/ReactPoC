declare module "*.jpg";
declare module 'eslint-plugin-import-newlines';

type AnyObject = { [key: string]: any };

type Parent<T = ReactNode> = Readonly<{ children: T }>;
type DefaultValue<T> = Readonly<{ defaultValue: T }>;
