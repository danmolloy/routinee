import React, { createContext, useContext } from 'react';
import Realm from 'realm';

export const RealmContext = createContext<Realm | null>(null);

export const useRealm = () => useContext(RealmContext);