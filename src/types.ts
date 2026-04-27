export type Rarity = 'common' | 'rare' | 'legendary';

export interface GIF {
  id: string;
  url: string;
  title: string;
  rarity: Rarity;
  createdAt?: any;
}

export interface DailyConfig {
  url: string;
  title?: string;
  date: string;
  isManual?: boolean;
  setBy?: string;
}

export interface UserItem {
  id: string;
  gifId: string;
  unlockedAt: any;
  gifUrl: string;
  gifTitle: string;
  rarity: Rarity;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}
