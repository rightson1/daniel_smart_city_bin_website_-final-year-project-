export const quickLinks = [
  {
    title: "Console",
    link: "/create/console",
  },
  {
    title: "Console Type",
    link: "/create/console-type",
  },
  {
    title: "Game",
    link: "/create/game",
  },
  {
    title: "Gamming Spot",
    link: "/create/spot",
  },
];
export const locations = [
  {
    id: 1,
    name: "Dagoretti",
    value: "dagoretti",
  },
  {
    id: 2,
    name: "Westlands",
    value: "westlands",
  },
  {
    id: 3,
    name: "Dagoretti North",
    value: "dagoretti_north",
  },
  {
    id: 4,
    name: "Dagoretti South",
    value: "dagoretti_south",
  },
  {
    id: 5,
    name: "Lang'ata",
    value: "langata",
  },
  {
    id: 6,
    name: "Kibra",
    value: "kibra",
  },
  {
    id: 7,
    name: "Roysambu",
    value: "roysambu",
  },
  {
    id: 8,
    name: "Kasarani",
    value: "kasarani",
  },
  {
    id: 9,
    name: "Embakasi South",
    value: "embakasi_south",
  },
  {
    id: 10,
    name: "Embakasi North",
    value: "embakasi_north",
  },
  {
    id: 11,
    name: "Embakasi Central",
    value: "embakasi_central",
  },
  {
    id: 12,
    name: "Embakasi East",
    value: "embakasi_east",
  },
  {
    id: 13,
    name: "Embakasi West",
    value: "embakasi_west",
  },
  {
    id: 14,
    name: "Makadara",
    value: "makadara",
  },
  {
    id: 15,
    name: "Kamukunji",
    value: "kamukunji",
  },
  {
    id: 16,
    name: "Starehe",
    value: "starehe",
  },
];

export const workers = [
  {
    _id: "1",
    displayName: "Rightson Tole",
    photoURL: "https://avatars.githubusercontent.com/u/47231140?v=4",
    email: "user@gmail.com",
    uid: "1",
    location: "dagoretti",
  },
  {
    _id: "2",
    displayName: "John Doe",
    photoURL: getRandomAvatarURL(),
    email: "john.doe@example.com",
    uid: "2",
    location: "langata",
  },
  {
    _id: "3",
    displayName: "Jane Smith",
    photoURL: getRandomAvatarURL(),
    email: "jane.smith@example.com",
    uid: "3",
    location: "kibra",
  },
  // Add more users here...
  {
    _id: "4",
    displayName: "Alice Johnson",
    photoURL: getRandomAvatarURL(),
    email: "alice.johnson@example.com",
    uid: "4",
    location: "kamukunji",
  },
  {
    _id: "5",
    displayName: "Bob Brown",
    photoURL: getRandomAvatarURL(),
    email: "bob.brown@example.com",
    uid: "5",
    location: "starehe",
  },
  // Add more users here...
];

function getRandomAvatarURL() {
  const baseAvatarURL = "https://avatars.githubusercontent.com/u/47231140?v=4";
  const randomSeed = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  return `${baseAvatarURL}&seed=${randomSeed}`;
}

export const bins = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const location = locations[Math.floor(Math.random() * locations.length)];
  return {
    id,
    name: `Bin ${id}`,
    image: `https://source.unsplash.com/400x400/?trash,bin,${location.value}`,
    location: location.name,
  };
});

export const notifications = [
  {
    id: 1,
    title: "Bin Damaged",
    message: `
    The bin at ${locations[0].name} has been damaged and needs repair.`,
    createdAt: new Date(),
    sender: "Rightson Tole",
  },
  {
    id: 2,
    title: "Overflowing Bin",
    message: `
    There is an overflowing bin in ${locations[1].name}. Please address it.`,
    createdAt: new Date(),
    sender: "John Doe",
  },
  {
    id: 3,
    title: "Community Cleanup",
    message: `
    A community cleanup event is scheduled in ${locations[2].name} this weekend.`,
    createdAt: new Date(),
    sender: "Jane Smith",
  },
  {
    id: 4,
    title: "New Recycling Program",
    message: `
    Introducing a new recycling program in ${locations[3].name}.`,
    createdAt: new Date(),
    sender: "Alice Johnson",
  },
  {
    id: 5,
    title: "Road Closure Alert",
    message: `
    Due to construction, roads in ${locations[4].name} will be closed temporarily.`,
    createdAt: new Date(),
    sender: "Bob Brown",
  },
  {
    id: 6,
    title: "Green Initiative",
    message: `
    Join us in promoting a green initiative in ${locations[5].name}.`,
    createdAt: new Date(),
    sender: "Eve Green",
  },
  {
    id: 7,
    title: "Public Meeting",
    message: `
    There will be a public meeting in ${locations[6].name} next week. Your participation is encouraged.`,
    createdAt: new Date(),
    sender: "Grace Public",
  },
  // Add more notifications as needed...
];

export const binsPieChart = [
  {
    label: "Roysambu (130 bins, 100 full)",
    id: 7,
    value: 130,
  },
  {
    label: "Westlands (120 bins, 90 full)",
    id: 2,
    value: 120,
  },
  {
    label: "Embakasi West (120 bins, 90 full)",
    id: 13,
    value: 120,
  },
  {
    label: "Lang'ata (110 bins, 85 full)",
    id: 5,
    value: 110,
  },
  {
    label: "Embakasi East (110 bins, 85 full)",
    id: 12,
    value: 110,
  },
];
