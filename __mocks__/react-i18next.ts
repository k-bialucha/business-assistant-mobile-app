import { initReactI18next } from 'react-i18next';

const useTranslation = () => ({
  t: (key: string) => `[Translation: <${key}>]`,
});

export { useTranslation, initReactI18next };
