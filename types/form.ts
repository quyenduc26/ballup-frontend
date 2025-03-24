import { Slot } from "@/types";

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
  price: number | { min: number; max: number };
  hours: number;
  total: number | { min: number; max: number };
  mapUrl: string;
  slots: [];
  amount: number;
  dayHours: number;
  nightHours: number;
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
  centerType: string;
};

export type PlayingSlotType = {
  id?: number;
  name: string;
  primaryPrice: number;
  nightPrice: number;
  playingCenterId: number;
  playingSlot?: Slot;
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
  members: any;
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
  firstName?: string;
  lastName?: string;
};

export type DetailTeam = {
  id: number;
  name: string;
  address: string;
  intro?: string;
  logo?: string;
  cover: string;
  sport: string;
  members?: Player[];
  owner: boolean;
  totalMembers: number;
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
  address: string;
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
  amount: number | { min: number; max: number };
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
export type MyGameResponse = {
  createdBy: number;
  membersRequired: number;
  description: string;
  id: number;
  name: string;
  fromTime: string;
  toTime: string;
  center: string;
  cover: string;
  type: string;
  conversationId: number;
  slotId: number;
  isCreator: boolean;
  teamA: GameTeamResponse;
  teamB: GameTeamResponse;
};
export type GameResponse = {
  sport: string;
  id: number;
  name: string;
  fromTime: string;
  toTime: string;
  cover: string;
  type: string;
  conversationId: number;
  slotId: number;
  centerName?: string;
  slotName: string;
  teamA: GameTeamResponse;
  teamB?: GameTeamResponse;
};
export type GameTeamResponse = {
  name: string;
  intro: string;
  logo: string;
  members: GameTeamMemberResponse[];
};
export type GameTeamMemberResponse = {
  id: any;
  avatar: string;
  firstName: string;
  lastName: string;
};

export type UserInfo = {
  id: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  email?: string;
  height?: number;
  weight?: number;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};
export type UpdateGameTimeAndSlotRequest = {
  gameId: number;
  fromTime?: number | null;
  toTime?: number | null;
  newSlotId?: number | null;
};
export type UpdateGameInfoRequest = {
  gameId: number;
  name: string;
  cover: string;
  description: string;
  membersRequired: number;
};

export type PlayingCenterEditType = {
  id?: number;
  name: string;
  address: string;
  description: string;
  imageUrls: string[];
  ownerId: number;
  centerType: string;
};

export interface PaymentMethodRequest {
  id?: string,
  name: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  bankBranch?: string;
  qrImageUrl: string;
  instructions?: string;
  isActive: boolean;
}
