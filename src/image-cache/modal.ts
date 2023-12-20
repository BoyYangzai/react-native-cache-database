import Realm, { ObjectSchema } from "realm";

export class ImageTable extends Realm.Object<ImageTable> {
  base64!: string;
  src!: string;
  static schema: ObjectSchema = {
    name: "ImageCache",
    properties: {
      base64: "string",
      src: "string",
    },
    primaryKey: "src",
  };
}
