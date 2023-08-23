import Realm from 'realm'

class Activity extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  blurb!: string;
  instances!: {
    date: string;
    hashtags: string[]
  }[];
  hashtags!: string[]
  static schema = {
    name: 'Activity',
    properties: {
      _id: 'objectId',
      name: 'string',
      blurb: 'string',
      instances: 'array',
      hashtags: 'array'
    },
    primaryKey: '_id',
  };
}

const realm = new Realm({ schema: [Activity], schemaVersion: 1 });

export default realm;