export interface I18nProps {
  t: (key: string, options?: object) => string,
  i18n: {
  	changeLanguage: (lang: string) => void
  }
}
