import { useMemo } from 'react';
import { Book, BookPermission } from '@/src/types';
import useAuth from '@hooks/useAuth';
interface BookPermissions {
  isAuthor: boolean;
  isCollaborator: boolean;
  reader: boolean;
}

function useBookPermissions(book: Book): BookPermissions {
  const { user } = useAuth();

  const permissions = useMemo(() => {
    const isAuthor = book.authorId === user?.id;
    const isCollaborator =
      user?.books.some(
        (perm: BookPermission) =>
          perm.bookId === book.id && perm.permission === 'collaborator'
      ) ?? false;

    return { isAuthor, isCollaborator, reader: !isAuthor && !isCollaborator };
  }, [book, user]);

  return permissions;
}

export default useBookPermissions;
