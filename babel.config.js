module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      { loose: true, useBuiltIns: true },
    ],
  ],
}
