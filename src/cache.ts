import { useQuery, useRealm } from "./image-cache/realm-provider";

const useCache = (modal: any) => {
  const cacheModal = useQuery(modal);
  const primaryKey = modal.schema.primaryKey;
  const modalName = modal.schema.name;

  const realm = useRealm();
  const getCacheItems = () => {
    const items = realm.objects(modalName);
    return items;
  };

  const setCache = (key: string, value: string) => {
    if (getCacheItem(key)) {
      realm.write(() => {
        // @ts-ignore
        realm.create(modalName, { base64: value, [primaryKey]: key }, "modified");
      });
      return;
    }
    realm.write(() => {
      realm.create(modalName, { base64: value, [primaryKey]: key });
    });
    return value;
  };

  const getCacheItem = (key: string) => {
    return cacheModal.filtered(`${primaryKey} = "${key}"`);
  };

  return { getCacheItems, setCache, getCacheItem };
};

export { useCache };
