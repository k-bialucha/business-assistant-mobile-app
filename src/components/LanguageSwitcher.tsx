import React from 'react';
import { Button, Text } from 'react-native';

import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC<{}> = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {/* TODO: remove */}
      <Text>{JSON.stringify(i18n.languages)}</Text>
      {i18n.languages.map(lang => (
        <Button
          key={lang}
          onPress={() => {
            i18n.changeLanguage(lang);
          }}
          title={`LANG: ${lang}`}
          // disabled={lang === i18n.language}
        />
      ))}
    </>
  );
};

export { LanguageSwitcher };
