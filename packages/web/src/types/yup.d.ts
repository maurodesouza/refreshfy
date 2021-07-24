import {
  ArrayLocale,
  BooleanLocale,
  DateLocale,
  MixedLocale,
  NumberLocale,
  ObjectLocale,
  StringLocale,
} from 'yup/lib/locale';

declare module 'yup' {
  export interface LocaleObject {
    mixed?: MixedLocale;
    string?: StringLocale;
    number?: NumberLocale;
    date?: DateLocale;
    boolean?: BooleanLocale;
    object?: ObjectLocale;
    array?: ArrayLocale;
  }

  export function setLocale(custom: LocaleObject): void;
}
