#### use MongoDb in Rn like localStorage api in Web 👋

### Getting Start
```
yarn add react-native-cache-database
```

### Usage
#### Usa Img Cache
Cache img as base64 to Load Image fast 🚀
<br>
Tests: opens in **seconds** in apps with a lot of image resources
#### For Single
```ts
  const mergedSourceUri = getCacheBySrc(source?.url);
  ...
  <Image source={uri:cacheSourceUri} />

```

#### For Lists
```ts
  const cacheSourceUri = getCacheBySrc(source?.url);

  ...
  render=(item =>
    <Image source={uri:cacheSourceUri} />
  )
```


