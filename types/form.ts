export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  role: string;
};
export type LoginFormType = {
  emailOrUsername: string;
  password: string;
};
export type FieldDetailType = {
  id: number;
  name: string;
  address: string;
  description: string;
  imageUrls: string[];
  bookingTime: string;
  returnTime: string;
  type: string;
  price: number;
  hours: number;
  total: number;
  mapUrl: string;
  slots: [];
  amount: number;
};

export type CardFieldType = {
  id: number;
  name: string;
  address: string;
  type: PlayingCenterType;
  bookingCount: number;
  image: string;
  primaryPrice: number;
  nightPrice: number;
};

export type ScheduleType = {
  date: string;
  fromTime: string;
  toTime: string;
  location?: string;
};
export type PlayingCenterType = {
  id?: number;
  name: string;
  address: string;
  description: string;
  images: string[];
  ownerId: number;
  type: string;
};
export type PlayingSlotType = {
  id?: number;
  name: string;
  primaryPrice: number;
  nightPrice: number;
  playingCenterId: number;
};
export type CreateTeamData = {
  name: string;
  address: string;
  intro: string;
  logo: string;
  cover: string;
  sport?: string;
  userId: number;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
  cover: string;
  intro: string;
  address: string;
  sport: string;
  totalMembers: number;
};

export type TeamCardProps = {
  team: {
    id: number;
    name: string;
    logo: string;
    cover: string;
    intro: string;
    address: string;
    sport: string;
    totalMembers: number;
  };
};

export type TeamHeaderProps = {
  teamId: number;
  logo?: string;
  name: string;
  intro?: string;
  address: string;
  sport: string;
  cover: string;
};

export type Player = {
  id: number;
  name: string;
  avatar?: string;
  height?: number;
  weight?: number;
};

export type DetailTeam = {
  id: number;
  name: string;
  address: string;
  intro?: string;
  logo?: string;
  cover: string;
  sport: string;
  members: Player[];
  owner: boolean;
};

export type KickMemberType = {
  userId: number;
  teamId: number;
};

export type deleteTeamType = {
  userId: number;
  teamId: number;
};
export type CreateMatchType = {
  userId: number;
  name: string;
  fromTime: number;
  toTime: number;
  location: string;
  description: string;
  cover: string;
  memberIdList: number[];
  userTeamId: number;
  type: string;
  membersRequired: number;
  slotId?: number | null;
};

export type queryTime = {
  fromTime: string;
  toTime: string;
};

export type BookingDataType = {
  userId: number;
  playingSlotId: number;
  fromTime: number;
  toTime: number;
  amount: number;
};

export type CenterSelection = {
  id: number;
  address: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  type?: string;
};
export type TeamOverviewResponse = {
  id: number;
  name: string;
  logo: string;
  cover: string;
  sport: string;
  totalMembers: number;
};

export type Profile = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  height: string;
  weight: string;
  avatar: string;
  email: string;
  password: string;
};
