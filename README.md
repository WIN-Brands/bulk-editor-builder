# Shopify Bulk Editor Link Builder

This is a tool to help manage creating, editing, and updating Bulk Editor links for the Shopify Admin Bulk Editor.

No data is saved or recorded as to the content of the links and all transforms are done client-side. As such, currently nothing pulls live data from your store so things such as variant-based options are not available yet.

Issues and PRs are open to help make this tool better for everyone.

# Changelog

## v1.0

- Initial launch
- Support integer and string metafield types
- Support non-variant-based editor options
- Add dynamic URL rebuilding
- Add admin URL swapping

# Build & Run Locally

## Major Dependencies

- Yarn
- Vue CLI
- @eastsideco/polaris-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```
