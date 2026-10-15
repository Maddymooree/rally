// Prototype sample chat history, keyed by crew id. The chat screen loads
// this as the initial state and appends new messages the demo user sends
// locally — nothing is persisted or sent anywhere.

export interface Message {
  id: string;
  crewId: string;
  authorId: string | "you";
  text: string;
  minutesAgo: number;
}

export const CONVERSATION_STARTERS = [
  "what sets is everyone hitting friday?",
  "anyone need a ride from the airport?",
  "who's down for a pregame before doors?",
];

export const MESSAGES: Message[] = [
  { id: "m1", crewId: "iii-points-26", authorId: "jaylen-k", text: "yoo rally crew is officially locked in 🔥", minutesAgo: 1440 },
  { id: "m2", crewId: "iii-points-26", authorId: "maya-p", text: "wait i'm so excited to meet everyone", minutesAgo: 1200 },
  { id: "m3", crewId: "iii-points-26", authorId: "sam-a", text: "what sets is everyone hitting friday?", minutesAgo: 600 },
  { id: "m4", crewId: "iii-points-26", authorId: "elena-l", text: "jamie jones for sure, then probably floating points late", minutesAgo: 590 },
  { id: "m5", crewId: "iii-points-26", authorId: "you", text: "anyone down to meet before? thinking the mana entrance", minutesAgo: 120 },
  { id: "m6", crewId: "iii-points-26", authorId: "jaylen-k", text: "yeah i'll be there around 6:45", minutesAgo: 110 },

  { id: "m7", crewId: "edc-orlando-26", authorId: "tai-r", text: "camping crew assemble", minutesAgo: 2000 },
  { id: "m8", crewId: "edc-orlando-26", authorId: "devon-w", text: "bringing a canopy + cooler, we're set", minutesAgo: 1900 },
  { id: "m9", crewId: "edc-orlando-26", authorId: "jaylen-k", text: "anyone need a ride from the airport?", minutesAgo: 300 },
];
