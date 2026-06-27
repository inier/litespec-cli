import en from "./en";

type TranslationDict = typeof en;

const translations: Record<string, () => Promise<TranslationDict>> = {
  en: () => Promise.resolve(en),
  zh: () => import("./zh").then(m => m.default),
};

export class I18n {
  private locale: string = "en";
  private dict: TranslationDict = en;

  async setLocale(locale: string): Promise<void> {
    this.locale = translations[locale] ? locale : "en";
    const loader = translations[this.locale];
    this.dict = await loader();
  }

  get t(): TranslationDict {
    return this.dict;
  }

  get currentLocale(): string {
    return this.locale;
  }
}

export const i18n = new I18n();
