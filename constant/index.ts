const BOOKING_STATUS = {
  0: "Requested",
  1: "Confirmed",
  2: "Rejected",
  3: "Deposited",
  4: "Completed",
};

export const NOTIFICATIONS = {
  // Owner notifications
  BOOKING_REQUESTED: {
    title: "New Booking Request",
    message: "You have received a new booking request.",
    color: "primary",
  },
  BOOKING_DEPOSITED: {
    title: "Booking Deposit Received",
    message: "A customer has deposited for their booking.",
    color: "primary",
  },
  BOOKING_CANCELLED: {
    title: "Booking Cancelled",
    message: "A customer has cancelled their booking.",
    color: "danger",
  },

  // User notifications
  BOOKING_CONFIRMED: {
    title: "Booking Confirmed",
    message: "Your booking has been confirmed!",
    color: "primary",
  },
  BOOKING_REJECTED: {
    title: "Booking Rejected",
    message: "Your booking request has been rejected by the owner.",
    color: "danger",
  },
  BOOKING_LATE_PAID: {
    title: "Late Payment Alert",
    message:
      "Your booking has been paid late. Please check your payment status.",
    color: "danger",
  },
  BOOKING_SUCCEEDED: {
    title: "Booking Completed",
    message: "Your booking is successfully completed!",
    color: "success",
  },

  // Team Owner notifications
  TEAM_JOINED: {
    title: "New Team Member",
    message: "A new member has joined your team.",
    color: "primary",
  },
  TEAM_LEFT: {
    title: "Member Left Team",
    message: "A member has left your team.",
    color: "warning",
  },

  // Team Member notifications
  TEAM_KICKED: {
    title: "Team Membership Ended",
    message: "You have been kicked from the team.",
    color: "danger",
  },
  TEAM_DELETED: {
    title: "Team Deleted",
    message: "The team has been deleted.",
    color: "danger",
  },

  // Game notifications
  GAME_JOINED: {
    title: "Game Joined",
    message: "You have joined the game by team joining.",
    color: "primary",
  },
  GAME_OPPONENT_JOINED: {
    title: "Opponent Found",
    message: "An opponent has joined your game!",
    color: "primary",
  },
  GAME_LEFT: {
    title: "Game Left",
    message: "You have left the game.",
    color: "warning",
  },
  GAME_DELETED: {
    title: "Game Deleted",
    message: "The game has been deleted.",
    color: "danger",
  },
} as const;

export type NotificationContentType = keyof typeof NOTIFICATIONS;
