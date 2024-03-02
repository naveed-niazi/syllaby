import React, { useState, Fragment } from 'react';
import { Section } from '@/src/types';

interface BookEditProps {
  section: Section;
  isAuthor?: boolean;
  addSubsection: (parentId: string) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, newTitle: string, content: string) => void;
}

const BookEdit: React.FC<BookEditProps> = ({
  section,
  isAuthor,
  addSubsection,
  removeSection,
  updateSection,
}) => {
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);

  const handleBlur = () => {
    updateSection(section.id, title, content);
  };

  return (
    <Fragment>
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleBlur}
          />
        </div>
        <div
          hidden={!isAuthor}
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          <button onClick={() => addSubsection(section.id)}>
            Add Subsection
          </button>
          <button onClick={() => removeSection(section.id)}>Remove</button>
        </div>
      </div>
      {section.sections.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {section.sections.map((child) => (
            <BookEdit
              key={child.id}
              section={child}
              addSubsection={addSubsection}
              removeSection={removeSection}
              updateSection={updateSection}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default BookEdit;
