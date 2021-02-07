import React from 'react';
import { Button } from 'react-native';

import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC<{}> = () => {
  const {
    i18n: { language, languages, changeLanguage },
  } = useTranslation();

  return (
    <>
      {languages.map(lang => (
        <Button
          key={lang}
          onPress={() => {
            changeLanguage('en');
          }}
          title={`LANG: ${lang}`}
          disabled={lang === language}
        />
      ))}
    </>
  );
};

export { LanguageSwitcher };
