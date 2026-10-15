// Prototype sample crew members — not real Rally users.

export interface Member {
  id: string;
  name: string;
  initials: string;
  age: number;
  city: string;
  favoriteArtists: string[];
  favoriteGenres: string[];
  color: string;
}

const AVATAR_COLORS = ["#7b8fff", "#f59e0b", "#34d399", "#f472b6", "#60a5fa", "#fb7185"];

function member(
  id: string,
  name: string,
  age: number,
  city: string,
  favoriteArtists: string[],
  favoriteGenres: string[],
  colorIndex: number
): Member {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
  return { id, name, initials, age, city, favoriteArtists, favoriteGenres, color: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] };
}

export const MEMBERS: Member[] = [
  member("jaylen-k", "jaylen k.", 24, "miami, fl", ["fisher", "john summit"], ["house", "edm"], 0),
  member("maya-p", "maya p.", 23, "fort lauderdale, fl", ["chris lake", "dom dolla"], ["house"], 1),
  member("sam-a", "sam a.", 26, "miami, fl", ["charlotte de witte", "amelie lens"], ["techno"], 2),
  member("tai-r", "tai r.", 22, "orlando, fl", ["kaskade", "gorgon city"], ["edm", "house"], 3),
  member("elena-l", "elena l.", 25, "miami, fl", ["black coffee", "kettama"], ["house", "dj set"], 4),
  member("devon-w", "devon w.", 27, "west palm beach, fl", ["eric prydz", "rezz"], ["techno", "edm"], 5),
];

export const CURRENT_USER_PLACEHOLDER: Pick<Member, "initials" | "color"> = {
  initials: "YOU",
  color: "#7b8fff",
};
