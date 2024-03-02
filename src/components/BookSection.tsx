import React, { useState, Fragment } from 'react';
import { Section } from '../../types';

const BookSection: React.FC<{
  section: Section;
  addSubsection: (parentId: string) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, newTitle: string, content: string) => void;
}> = ({ section, addSubsection, removeSection, updateSection }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);

  const handleBlur = () => {
    setIsEditing(false);
    updateSection(section.id, title, content);
  };

  return (
    <Fragment>
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur}
            />
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
            />
          </>
        ) : (
          <span>
            <span onDoubleClick={() => setIsEditing(true)}>{title}</span>
            <span onDoubleClick={() => setIsEditing(true)}>{content}</span>
          </span>
        )}
        <button onClick={() => addSubsection(section.id)}>
          Add Subsection
        </button>
        <button onClick={() => removeSection(section.id)}>Remove</button>
      </div>
      {section.sections.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {section.sections.map((child) => (
            <BookSection
              key={child.id}
              section={child}
              addSubsection={addSubsection}
              removeSection={removeSection}
              updateSectionTitle={updateSectionTitle}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default BookSection;
