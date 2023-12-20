import Realm from "realm";
import { createRealmContext } from "@realm/react";

import { ImageTable } from "./modal";

const realmConfig: Realm.Configuration = {
  schema: [ImageTable],
  schemaVersion: 2,
};

const { RealmProvider, useRealm, useObject, useQuery } = createRealmContext(realmConfig);

export { RealmProvider, useRealm, useObject, useQuery };
