module.exports = api => {
  api.cache(true);

  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '~~env': './env.ts',
            '~': './src/',
          },
        },
      ],
    ],
  };
};
