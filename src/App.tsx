/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTab, Post, CalendarEvent, HighlightEvent, SigaDeadline, Competition, UserProfileData } from './types';
import {
  INITIAL_POSTS,
  PROFILE_POSTS,
  CALENDAR_EVENTS,
  HIGHLIGHT_EVENTS,
  SIGA_DEADLINES,
  COMPETITIONS,
  INITIAL_USER_PROFILE,
} from './data/mockData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CommunityFeed } from './components/CommunityFeed';
import { CalendarView } from './components/CalendarView';
import { UserProfile } from './components/UserProfile';
import { CoursesView } from './components/CoursesView';
import { JobsView } from './components/JobsView';

import { CreatePostModal } from './components/modals/CreatePostModal';
import { CreateEventModal } from './components/modals/CreateEventModal';
import { EventDetailModal } from './components/modals/EventDetailModal';
import { SyncCalendarModal } from './components/modals/SyncCalendarModal';
import { ThreadDetailModal } from './components/modals/ThreadDetailModal';
import { EditProfileModal } from './components/modals/EditProfileModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('comunidade');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary application state
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [profilePosts, setProfilePosts] = useState<Post[]>(PROFILE_POSTS);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS);
  const [highlightEvents, setHighlightEvents] = useState<HighlightEvent[]>(HIGHLIGHT_EVENTS);
  const [deadlines] = useState<SigaDeadline[]>(SIGA_DEADLINES);
  const [competitions] = useState<Competition[]>(COMPETITIONS);
  const [userProfile, setUserProfile] = useState<UserProfileData>(INITIAL_USER_PROFILE);

  // Modals state
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeEventDetail, setActiveEventDetail] = useState<CalendarEvent | null>(null);
  const [activeThreadDetail, setActiveThreadDetail] = useState<Post | null>(null);

  // Handlers
  const handleCreatePost = (newPostData: Omit<Post, 'id' | 'timeAgo' | 'upvotes' | 'commentCount'>) => {
    const createdPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timeAgo: 'agora mesmo',
      upvotes: 1,
      commentCount: 0,
      userVote: 'up',
      commentsList: [],
    };

    setPosts([createdPost, ...posts]);
    setProfilePosts([createdPost, ...profilePosts]);

    // Reward user with karma
    setUserProfile((prev) => ({
      ...prev,
      karma: prev.karma + 10,
      stats: {
        ...prev.stats,
        publications: prev.stats.publications + 1,
        newThisMonth: prev.stats.newThisMonth + 1,
      },
    }));
  };

  const handleCreateEvent = (newEvent: CalendarEvent) => {
    setCalendarEvents((prev) => [newEvent, ...prev]);
  };

  const handleVotePost = (postId: string, dir: 'up' | 'down') => {
    const updateList = (list: Post[]) =>
      list.map((p) => {
        if (p.id !== postId) return p;

        let newVote: 'up' | 'down' | null = dir;
        let delta = 0;

        if (p.userVote === dir) {
          // undo vote
          newVote = null;
          delta = dir === 'up' ? -1 : 1;
        } else if (p.userVote === (dir === 'up' ? 'down' : 'up')) {
          // switch vote
          delta = dir === 'up' ? 2 : -2;
        } else {
          // first vote
          delta = dir === 'up' ? 1 : -1;
        }

        return {
          ...p,
          upvotes: Math.max(0, p.upvotes + delta),
          userVote: newVote,
        };
      });

    setPosts(updateList);
    setProfilePosts(updateList);

    if (activeThreadDetail && activeThreadDetail.id === postId) {
      setActiveThreadDetail((prev) => {
        if (!prev) return null;
        const delta = dir === 'up' ? (prev.userVote === 'up' ? -1 : 1) : prev.userVote === 'down' ? 1 : -1;
        return {
          ...prev,
          upvotes: Math.max(0, prev.upvotes + delta),
          userVote: prev.userVote === dir ? null : dir,
        };
      });
    }
  };

  const handleToggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const handleToggleHighlightInterest = (id: string) => {
    setHighlightEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isInterested: !e.isInterested } : e))
    );
  };

  const handleToggleHighlightSave = (id: string) => {
    setHighlightEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isSaved: !e.isSaved } : e))
    );
  };

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author: userProfile.name,
      avatar: userProfile.email,
      email: userProfile.email,
      text: commentText,
      timeAgo: 'agora mesmo',
      upvotes: 0,
    };

    const updatePost = (p: Post) => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentCount: p.commentCount + 1,
        commentsList: [newComment, ...(p.commentsList || [])],
      };
    };

    setPosts((prev) => prev.map(updatePost));
    setProfilePosts((prev) => prev.map(updatePost));

    if (activeThreadDetail && activeThreadDetail.id === postId) {
      setActiveThreadDetail((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          commentCount: prev.commentCount + 1,
          commentsList: [newComment, ...(prev.commentsList || [])],
        };
      });
    }

    // Award solution karma
    setUserProfile((prev) => ({
      ...prev,
      karma: prev.karma + 5,
      stats: {
        ...prev.stats,
        solutions: prev.stats.solutions + 1,
      },
    }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfileData>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Area */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        {currentTab === 'comunidade' && (
          <CommunityFeed
            posts={posts}
            onOpenCreatePostModal={() => setIsCreatePostOpen(true)}
            onSelectPost={(post) => setActiveThreadDetail(post)}
            onVotePost={handleVotePost}
            onToggleSavePost={handleToggleSavePost}
            onSelectTab={setCurrentTab}
            searchFilter={searchQuery}
          />
        )}

        {currentTab === 'calendario' && (
          <CalendarView
            events={calendarEvents}
            highlightEvents={highlightEvents}
            deadlines={deadlines}
            competitions={competitions}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            onOpenCreateEventModal={() => setIsCreateEventOpen(true)}
            onSelectEvent={(evt) => setActiveEventDetail(evt)}
            onToggleHighlightInterest={handleToggleHighlightInterest}
            onToggleHighlightSave={handleToggleHighlightSave}
            searchFilter={searchQuery}
          />
        )}

        {currentTab === 'perfil' && (
          <UserProfile
            profile={userProfile}
            profilePosts={profilePosts}
            onOpenEditModal={() => setIsEditProfileOpen(true)}
            onSelectPost={(post) => setActiveThreadDetail(post)}
            onVotePost={handleVotePost}
          />
        )}

        {currentTab === 'cursos' && <CoursesView />}

        {currentTab === 'vagas' && <JobsView />}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenGuidelines={() =>
          alert(
            'Diretrizes da Comunidade FATEC Voz do Fatecano:\n\n1. Respeito mútuo entre todos os discentes, docentes e egressos.\n2. Não publicar conteúdos protegidos por sigilo de estágio sem autorização.\n3. Apoio colaborativo e ético no desenvolvimento de Projetos Integradores (PI) e TCCs.'
          )
        }
      />

      {/* Global Modals */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handleCreatePost}
      />

      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => setIsCreateEventOpen(false)}
        onSubmit={handleCreateEvent}
      />

      <EventDetailModal
        event={activeEventDetail}
        onClose={() => setActiveEventDetail(null)}
        onSyncOne={(evt) => {
          const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            evt.title
          )}&details=${encodeURIComponent(evt.description)}&location=${encodeURIComponent(
            evt.campus
          )}&dates=20250514T100000Z/20250514T120000Z`;
          window.open(googleUrl, '_blank');
        }}
      />

      <SyncCalendarModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />

      <ThreadDetailModal
        post={activeThreadDetail}
        onClose={() => setActiveThreadDetail(null)}
        onAddComment={handleAddComment}
        onVotePost={handleVotePost}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={userProfile}
        onSave={handleUpdateProfile}
      />
    </div>
  );
}
