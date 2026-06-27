import { 
  NewsArticle, FFEvent, RedeemCode, Guide, Player,
  INITIAL_NEWS, INITIAL_EVENTS, INITIAL_CODES, INITIAL_GUIDES, INITIAL_PLAYERS 
} from './mockData';

const KEYS = {
  NEWS: 'ff_journal_news',
  EVENTS: 'ff_journal_events',
  CODES: 'ff_journal_codes',
  GUIDES: 'ff_journal_guides',
  PLAYERS: 'ff_journal_players',
  USERS: 'ff_journal_users',
  LOGGED_IN_USER: 'ff_journal_current_user',
};

export const storage = {
  init: () => {
    if (!localStorage.getItem(KEYS.NEWS)) localStorage.setItem(KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
    if (!localStorage.getItem(KEYS.EVENTS)) localStorage.setItem(KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    if (!localStorage.getItem(KEYS.CODES)) localStorage.setItem(KEYS.CODES, JSON.stringify(INITIAL_CODES));
    if (!localStorage.getItem(KEYS.GUIDES)) localStorage.setItem(KEYS.GUIDES, JSON.stringify(INITIAL_GUIDES));
    if (!localStorage.getItem(KEYS.PLAYERS)) localStorage.setItem(KEYS.PLAYERS, JSON.stringify(INITIAL_PLAYERS));
  },

  getNews: (): NewsArticle[] => JSON.parse(localStorage.getItem(KEYS.NEWS) || '[]'),
  setNews: (data: NewsArticle[]) => localStorage.setItem(KEYS.NEWS, JSON.stringify(data)),

  getEvents: (): FFEvent[] => JSON.parse(localStorage.getItem(KEYS.EVENTS) || '[]'),
  setEvents: (data: FFEvent[]) => localStorage.setItem(KEYS.EVENTS, JSON.stringify(data)),

  getCodes: (): RedeemCode[] => JSON.parse(localStorage.getItem(KEYS.CODES) || '[]'),
  setCodes: (data: RedeemCode[]) => localStorage.setItem(KEYS.CODES, JSON.stringify(data)),

  getGuides: (): Guide[] => JSON.parse(localStorage.getItem(KEYS.GUIDES) || '[]'),
  setGuides: (data: Guide[]) => localStorage.setItem(KEYS.GUIDES, JSON.stringify(data)),

  getPlayers: (): Player[] => JSON.parse(localStorage.getItem(KEYS.PLAYERS) || '[]'),

  getUsers: () => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  setUsers: (users: any[]) => localStorage.setItem(KEYS.USERS, JSON.stringify(users)),

  getCurrentUser: () => JSON.parse(localStorage.getItem(KEYS.LOGGED_IN_USER) || 'null'),
  setCurrentUser: (user: any) => localStorage.setItem(KEYS.LOGGED_IN_USER, JSON.stringify(user)),
};
