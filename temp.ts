export const Books = [
  {
    id: '1',
    authorId: '1',
    title: 'Book 1',
    sections: [
      {
        id: '1',
        title: 'Section 1',
        creatorId: '1',
        content: 'Content 1',
        sections: [
          {
            id: '1.1',
            title: 'Section 1.1',
            creatorId: '1',
            content: 'Content 1.1',
            sections: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    authorId: '2',
    title: 'Book 2',
    sections: [
      {
        id: '1',
        title: 'Section 1',
        creatorId: '2',
        content: 'Content 1',
        sections: [
          {
            id: '1',
            title: 'Section 1',
            creatorId: '2',
            content: 'Content 1',
            sections: [],
          },
        ],
      },
    ],
  },
];
