import React from 'react';
import { Section } from '@/src/types';

interface BookViewProps {
  section: Section;
}

const BookView: React.FC<BookViewProps> = ({ section }) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <h3>{section.title}</h3>
      <span>{section.content}</span>
      {section.sections.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {section.sections.map((child) => (
            <BookView key={child.id} section={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookView;
