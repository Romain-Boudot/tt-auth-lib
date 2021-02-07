# tt-auth-lib

## Project setup
```
npm i @coocaa/tt-auth-lib
```

## Usage
```ts
import { default as auth } from '@cooca/tt-front-lib'
const key = require('./touitteur-app-firebase-adminsdk-xxxxx-xxxxxxxxxx.json')
const {
  setProfilPictureUrl,
  setProfilBannerUrl,
  getProfilPictureUrl,
  getProfilBannerUrl,
  verify
} = auth(key)
```
