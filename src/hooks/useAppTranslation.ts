import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { TranslationKeys } from '~/utils/translations/types';

export const useAppTranslation = () => {
  const { t: tFunc }: { t: TFunction } = useTranslation();
  const t = (text: TranslationKeys): string => tFunc(text);

  return { t };
};
