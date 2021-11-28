interface User {
  email?: string;
  name?: string;
  imageUrl?: string;
  provider?: string;
  providerData?: any;
  accessToken?: string;
  accessTokenExpiration?: string;
}

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
