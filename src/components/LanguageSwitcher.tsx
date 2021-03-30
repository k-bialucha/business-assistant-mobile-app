import React from 'react';
import { Button } from 'react-native';

import { useTranslation } from 'react-i18next';

import { resources } from '~/utils/i18n';

const availableLanguages = Object.keys(resources);

const LanguageSwitcher: React.FC<{}> = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {availableLanguages.map(lang => (
        <Button
          key={lang}
          onPress={() => {
            i18n.changeLanguage(lang);
          }}
          title={`LANG: ${lang}`}
          disabled={lang === i18n.language}
        />
      ))}
    </>
  );
};

export { LanguageSwitcher };
