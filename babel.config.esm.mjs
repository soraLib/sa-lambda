export default {
  plugins: [
    ['babel-plugin-add-import-extension', {
      extension: 'mjs'
    }],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining"
  ],
}
