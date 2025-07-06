import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { NOTE_UPDATED, USER_TYPING } from '../graphql/subscriptions';

export function useNoteSubscription(noteId) {
  const [typingUsers, setTypingUsers] = useState([]);

  const { data: noteData } = useSubscription(NOTE_UPDATED, {
    variables: { noteId },
    skip: !noteId,
  });

  const { data: typingData } = useSubscription(USER_TYPING, {
    variables: { noteId },
    skip: !noteId,
  });

  useEffect(() => {
    if (typingData?.userTyping) {
      const { userId, email, isTyping } = typingData.userTyping;
      
      if (isTyping) {
        setTypingUsers(prev => {
          const exists = prev.find(user => user.userId === userId);
          if (!exists) {
            return [...prev, { userId, email }];
          }
          return prev;
        });
      } else {
        setTypingUsers(prev => prev.filter(user => user.userId !== userId));
      }
    }
  }, [typingData]);

  return {
    noteUpdate: noteData?.noteUpdated,
    typingUsers,
  };
} 