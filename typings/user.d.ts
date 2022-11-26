export interface User {
  meta: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
  };
  token: string;
  record: UserData;
}

export interface UserData {
  id?: string;
  created?: string;
  updated?: string;
  email?: string;
  verified?: boolean;
  lastResetSentAt?: string;
  lastVerificationSentAt?: string;
  // record?: UserProfile;
  username?: string;
  avatar?: string;
}

// export interface UserProfile {
//   id?: string;
//   created?: string;
//   updated?: string;
//   avatar?: string;
//   name?: string;
//   userId?: string;
//   coin?: number;
//   coinGetDelay?: number;
//   lastTimeCoinAcquired?: number | string;
//   lastTimeLeveledUP?: number | string;
//   exp?: number;
//   level?: number;
//   contributionPoint?: number;
//   "@collectionId"?: string;
//   "@collectionName"?: string;
//   "@expand"?: any;
// }

export interface GravatarProfile {
  id?: string;
  hash?: string;
  requestHash?: string;
  profileUrl?: string;
  preferredUsername?: string;
  thumbnailUrl?: string;
  photos?: Array<{
    value?: string;
    type?: string;
  }>;
  name?: string[];
  displayName?: string;
  urls?: string[];
  // prognovel related data
  isAboutMeEmpty?: boolean;
  aboutMe?: string;
}
