import Realm from 'realm';

import { createRealmContext } from '@realm.io/react';

class Task {
  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      description: 'string',
      isComplete: { type: 'bool', default: false },
    },
  };
}

// class Task extends Realm.Object {
//   static generate(description) {
//     return {
//       _id: new Realm.BSON.ObjectId(),
//       description,
//       isComplete: false,
//     };
//   }

//   // To use a class as a Realm object type, define the object schema on the static property "schema".
//   static schema = {
//     name: 'Task',
//     primaryKey: '_id',
//     properties: {
//       _id: 'objectId',
//       description: 'string',
//       isComplete: { type: 'bool', default: false },
//     },
//   };
// }

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext({ schema: [Task.schema] });
