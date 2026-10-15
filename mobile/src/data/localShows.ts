// Prototype sample data for "shows near you" — mirrors the near-you
// club-night cards on the website (smaller, single-venue shows rather
// than multi-day festivals).

export interface LocalShow {
  id: string;
  artist: string;
  venue: string;
  city: string;
  dateLabel: string;
  image: string;
  interestedCount: number;
  genres: string[];
}

export const LOCAL_SHOWS: LocalShow[] = [
  {
    id: "cloonee-club-space",
    artist: "cloonee, omar+, vintage culture",
    venue: "club space",
    city: "miami, fl",
    dateLabel: "oct 15",
    image: "https://picsum.photos/seed/rally-cloonee/800/600",
    interestedCount: 87,
    genres: ["house", "dj set"],
  },
  {
    id: "disco-lines-club-space",
    artist: "disco lines w/ four tet b2b floating points",
    venue: "club space",
    city: "miami, fl",
    dateLabel: "oct 17",
    image: "https://picsum.photos/seed/rally-discolines/800/600",
    interestedCount: 64,
    genres: ["house", "electronic"],
  },
  {
    id: "hocus-pocus",
    artist: "hocus pocus: eric prydz, chase & status, gorgon city",
    venue: "factory town",
    city: "miami, fl",
    dateLabel: "oct 30 - nov 1",
    image: "https://picsum.photos/seed/rally-hocuspocus/800/600",
    interestedCount: 203,
    genres: ["techno", "house"],
  },
  {
    id: "circoloco-miami",
    artist: "circoloco miami",
    venue: "factory town",
    city: "miami, fl",
    dateLabel: "dec 5",
    image: "https://picsum.photos/seed/rally-circoloco/800/600",
    interestedCount: 156,
    genres: ["house", "techno"],
  },
];
