import { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { NOTE_CREATED, NOTE_SHARED } from '../graphql/subscriptions';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const { data: createdData } = useSubscription(NOTE_CREATED);
  const { data: sharedData } = useSubscription(NOTE_SHARED);

  useEffect(() => {
    if (createdData?.noteCreated) {
      setNotifications((prev) => [
        ...prev,
        {
          id: `created-${createdData.noteCreated.id}`,
          type: 'created',
          message: `New note created: ${createdData.noteCreated.title}`,
          timestamp: createdData.noteCreated.createdAt,
        },
      ]);
    }
  }, [createdData]);

  useEffect(() => {
    if (sharedData?.noteShared) {
      setNotifications((prev) => [
        ...prev,
        {
          id: `shared-${sharedData.noteShared.id}`,
          type: 'shared',
          message: `A note was shared with you: ${sharedData.noteShared.title}`,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [sharedData]);

  // Optionally, add a method to clear notifications
  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return { notifications, clearNotification };
} 