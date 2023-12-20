import { useCache } from "../cache";
import { ImageTable } from "./modal";

const useImageCache = () => {
  const { setCache, getCacheItem, getCacheItems } = useCache(ImageTable);

  const getCacheBySrc = async (src: string | string[]) => {
    if (Array.isArray(src)) {
      // 使用 Promise.all 等待所有异步操作完成
      const results = await Promise.all(
        src.map(async (item) => {
          if (!getCacheItem(item)[0]) {
            const base64 = await imageUrlToBase64(item);
            setCacheBySrc(item, base64);
            return base64;
          }
          return getCacheItem(item)[0];
        }),
      );
      return results;
    }

    if (!getCacheItem(src)[0]) {
      const base64 = await imageUrlToBase64(src);
      setCacheBySrc(src, base64);
      return base64;
    }
    return getCacheItem(src)[0];
  };

  const setCacheBySrc = (src: string, base64: string) => {
    return setCache(src, base64);
  };

  return { getCacheBySrc, setCacheBySrc, getCacheItems };
};

export { useImageCache };

async function imageUrlToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Error converting image to base64: result is not a string"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading image file"));
      };

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`Error fetching image: ${error}`);
  }
}
