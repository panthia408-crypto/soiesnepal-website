// Shared constant arrays used across sections

export interface Notice {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  pdf?: string;
}

// Placeholder data when Sanity is not connected
export const placeholderNotices: Notice[] = [
  {
    _id: "1",
    title: "Orientation and Class Notice",
    category: "academic",
  },
  {
    _id: "2",
    title: "To Whom It May Concern",
    description:
      "This is to formally inform all members that Ms. Prashuna Thapa, Executive Member and Research & Workshop Coordinator of SOIES Nepal, has...",
    category: "administrative",
  },
  {
    _id: "3",
    title: "Research Paper Writing Seminar",
    category: "event",
  },
  {
    _id: "4",
    title: "Call for Article - Industrial Vision",
    category: "academic",
  },
  {
    _id: "5",
    title: "Discord Server Launch",
    description:
      "SOIES Nepal has launched its official Discord server to provide students with a central platform for collaboration and learning.",
    category: "other",
  },
];
