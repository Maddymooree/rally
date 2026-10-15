// Prototype sample data — not live bookings. Mirrors the kind of festivals
// listed on youshouldrally.com/festivals, reused here as placeholder
// content per the brief ("use clearly labeled sample event data rather
// than implying current event availability").

export interface Festival {
  id: string;
  name: string;
  city: string;
  dateLabel: string;
  image: string;
  interestedCount: number;
  description: string;
  artists: string[];
}

// picsum.photos seeded placeholders stand in for real festival photography
// in this prototype.
export const FESTIVALS: Festival[] = [
  {
    id: "iii-points",
    name: "iii points",
    city: "miami, fl",
    dateLabel: "oct 16-17",
    image: "https://picsum.photos/seed/rally-iiipoints/800/1000",
    interestedCount: 412,
    description:
      "miami's home for leftfield electronic music — warehouse stages, art installations, and a lineup that goes deep instead of wide.",
    artists: ["jamie jones", "seth troxler", "kaytranada", "overmono"],
  },
  {
    id: "edc-orlando",
    name: "edc orlando",
    city: "orlando, fl",
    dateLabel: "nov 6-8",
    image: "https://picsum.photos/seed/rally-edcorlando/800/1000",
    interestedCount: 1284,
    description:
      "insomniac's flagship east-coast event — multiple stages of house, bass, and big-room, camping optional.",
    artists: ["david guetta", "martin garrix", "zedd", "rezz"],
  },
  {
    id: "ultra-miami",
    name: "ultra miami",
    city: "miami, fl",
    dateLabel: "mar 26-28",
    image: "https://picsum.photos/seed/rally-ultra/800/1000",
    interestedCount: 956,
    description:
      "downtown miami's marquee festival — three days of mainstage anthems and the resistance stage for the deeper cuts.",
    artists: ["afrojack", "charlotte de witte", "carl cox", "amelie lens"],
  },
  {
    id: "coachella",
    name: "coachella",
    city: "indio, ca",
    dateLabel: "apr 9-11",
    image: "https://picsum.photos/seed/rally-coachella/800/1000",
    interestedCount: 2103,
    description:
      "the desert's biggest weekend — genre-spanning lineup with a serious electronic presence after dark.",
    artists: ["fred again..", "disclosure", "four tet", "peggy gou"],
  },
  {
    id: "crssd",
    name: "crssd festival",
    city: "san diego, ca",
    dateLabel: "may 2-3",
    image: "https://picsum.photos/seed/rally-crssd/800/1000",
    interestedCount: 318,
    description:
      "waterfront house + techno festival at waterfront park — golden-hour sets with a view of the san diego bay.",
    artists: ["chris lake", "kaytranada", "black coffee", "job jobse"],
  },
];
