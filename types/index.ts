export type Book = {
  id: string;
  authorId: string;
  title: string;
  sections: Section[];
};

export type User = {
  id: string;
  name: string;
  books: BookPermission[];
};

export type Section = {
  id: string;
  title: string;
  creatorId: string;
  content: string;
  sections: Section[];
};

export type Permission = 'author' | 'collaborator';

export type BookPermission = {
  bookId: string;
  permission: Permission;
};
