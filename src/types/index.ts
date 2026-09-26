export type NavTab = 'comunidade' | 'calendario' | 'cursos' | 'vagas' | 'perfil';

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  email: string;
  text: string;
  timeAgo: string;
  upvotes: number;
}

export interface Post {
  id: string;
  authorName: string;
  authorEmail: string;
  authorCampus: string;
  isVerified: boolean;
  timeAgo: string;
  tagCategory: string; // e.g., #ads, #vagas, #institucional, #pesquisa
  tagCategoryType: string; // e.g. [Projeto Integrador], [Vagas & Estágio]
  title: string;
  content: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  imageUrl?: string;
  imageCaption?: string;
  imageAlt?: string;
  moderationTip?: string;
  upvotes: number;
  userVote?: 'up' | 'down' | null;
  commentCount: number;
  isResolved?: boolean;
  isPinned?: boolean;
  isSaved?: boolean;
  commentsList?: Comment[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  shortTitle: string;
  type: 'cps' | 'provas' | 'maratona' | 'sematec' | 'carreiras';
  dateStr: string; // YYYY-MM-DD
  day: number;
  month: number; // 0-indexed or 1-indexed (5 for May)
  year: number;
  timeStr?: string;
  campus: string;
  description: string;
  badgeStyle: 'primary' | 'secondary' | 'error' | 'tertiary' | 'dim';
  badgeLabel?: string;
  isUrgent?: boolean;
  isHoliday?: boolean;
  isToday?: boolean;
  location?: string;
  actionUrl?: string;
}

export interface HighlightEvent {
  id: string;
  title: string;
  category: string;
  tags: string[];
  modality: string;
  description: string;
  dateFormatted: string;
  locationFormatted: string;
  imageUrl: string;
  imageAlt: string;
  isSaved?: boolean;
  isInterested?: boolean;
}

export interface SigaDeadline {
  id: string;
  title: string;
  department: string;
  daysRemaining: number;
  progressPercent: number;
  deadlineDateText: string;
  actionText: string;
  actionUrl: string;
  isUrgent?: boolean;
}

export interface Competition {
  id: string;
  title: string;
  categoryTag: string;
  phaseTag: string;
  description: string;
  deadlineText: string;
  actionText: string;
  prizeText?: string;
}

export interface UserProfileData {
  id: string;
  studentId: string;
  name: string;
  handle: string;
  email: string;
  karma: number;
  courseSemester: string;
  campus: string;
  memberSince: string;
  academicLevel: string;
  levelBadge: string;
  progressCurrent: number;
  progressMax: number;
  stats: {
    publications: number;
    newThisMonth: number;
    solutions: number;
    totalUpvotes: number;
    dailyStreak: number;
  };
  badges: Array<{
    id: string;
    icon: string;
    title: string;
    color: string;
  }>;
  rankings: Array<{
    rank: number;
    name: string;
    course: string;
    points: number;
    isSelf?: boolean;
  }>;
  semesterSubjects: Array<{
    id: string;
    name: string;
    members: string;
    icon: string;
  }>;
  socialLinks: {
    github: string;
    githubUrl: string;
    linkedin: string;
    linkedinUrl: string;
    lattes: string;
    lattesUrl: string;
  };
  pinnedPostId?: string;
}
