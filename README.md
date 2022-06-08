<a href="https://www.npmjs.com/package/@tobytop/ng-formbuilder"><img src="https://img.shields.io/npm/v/@tobytop/ng-formbuilder" alt="Npm"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@tobytop/ng-formbuilder" alt="License"></a>

# Introduce

ng-formbuilder is a form building component that can generate dynamic rendering, data collection, validation and submission functions from JSON. More than a dozen common form components and custom components are built in, and complex forms can be easily handled.

# Install

```node
npm i @tobytop/ng-formbuilder 
```

style.scss

```scss
@import '/node_modules/@tobytop/ng-formbuilder/src/lib/styles/style.scss';
```

polyfills.ts

```javascript
(window as any).process = {
    env: { DEBUG: undefined },
  };
```