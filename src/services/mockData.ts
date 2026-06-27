export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: 'Update' | 'Esports' | 'Event' | 'Character' | 'Weapon';
  image: string;
  date: string;
  isTrending?: boolean;
}

export interface FFEvent {
  id: string;
  title: string;
  description: string;
  type: 'Current' | 'Upcoming' | 'Reward' | 'Mission';
  image: string;
  startDate: string;
  endDate: string;
  region: string;
}

export interface RedeemCode {
  id: string;
  code: string;
  status: 'Active' | 'Expired';
  region: string;
  addedAt: string;
}

export interface Guide {
  id: string;
  title: string;
  category: 'Beginner' | 'Character' | 'Weapon' | 'Pet' | 'Rank' | 'Settings';
  content: string;
  image: string;
}

export interface Player {
  uid: string;
  name: string;
  level: number;
  rank: string;
  region: string;
  kdRatio: number;
  winRate: string;
}

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'New OB45 Update: Mega Changes!',
    content: 'The latest OB45 update brings massive changes to the gameplay mechanics...',
    category: 'Update',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    date: '2023-10-25',
    isTrending: true,
  },
  {
    id: '2',
    title: 'Esports World Cup Qualifiers Begin',
    content: 'Teams from around the globe are preparing for the ultimate showdown...',
    category: 'Esports',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    date: '2023-10-24',
  },
];

export const INITIAL_EVENTS: FFEvent[] = [
  {
    id: '1',
    title: 'Hacker Store: Elite Pass Edition',
    description: 'Get exclusive rewards from the hacker store this week.',
    type: 'Current',
    image: 'https://images.unsplash.com/photo-1614027126733-ee58f5471b59?auto=format&fit=crop&q=80&w=800',
    startDate: '2023-10-20',
    endDate: '2023-11-01',
    region: 'Global',
  },
];

export const INITIAL_CODES: RedeemCode[] = [
  {
    id: '1',
    code: 'FF9M2GF14CBF',
    status: 'Active',
    region: 'IND',
    addedAt: '2023-10-25',
  },
  {
    id: '2',
    code: 'FFBCLGQNSS98',
    status: 'Expired',
    region: 'Global',
    addedAt: '2023-10-10',
  },
];

export const INITIAL_GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Best Sensitivity Settings for Headshots',
    category: 'Settings',
    content: 'Master your aim with these pro sensitivity settings...',
    image: 'https://images.unsplash.com/photo-1605895617115-c1d07ec7612d?auto=format&fit=crop&q=80&w=800',
  },
];

export const INITIAL_PLAYERS: Player[] = [
  {
    uid: '123456789',
    name: 'Zeus_King',
    level: 75,
    rank: 'Grandmaster',
    region: 'Nigeria',
    kdRatio: 4.5,
    winRate: '65%',
  },
];
