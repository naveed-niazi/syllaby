import { useState } from 'react';
import useAuth from '@hooks/useAuth';
import { Section } from '../types';
import BookEdit from '@components/BookEdit';

type SectionsState = Section[];

interface BookFormProps {
  section: Section[];
  isAuthor?: boolean;
  isNew?: boolean;
  handleSave: (sections: Section[]) => void;
}

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const BookForm = ({
  isNew = false,
  section,
  handleSave,
  isAuthor = true,
}: BookFormProps) => {
  const { user } = useAuth();
  const [sections, setSections] = useState<SectionsState>(section);

  const addSection = (e: React.FormEvent) => {
    e.preventDefault();
    const newSection: Section = {
      id: generateId(),
      title: `Section ${sections.length + 1}`,
      content: '',
      creatorId: user?.id || '',
      sections: [],
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: string, newTitle: string, newContent: string) => {
    const updateTitleRecursive = (
      sections: SectionsState,
      id: string,
      newTitle: string,
      newContent: string
    ): SectionsState => {
      return sections.map((section) => {
        if (section.id === id) {
          return { ...section, title: newTitle, content: newContent };
        } else if (section.sections.length) {
          return {
            ...section,
            sections: updateTitleRecursive(
              section.sections,
              id,
              newTitle,
              newContent
            ),
          };
        }
        return section;
      });
    };

    setSections(updateTitleRecursive(sections, id, newTitle, newContent));
  };

  const addSubsection = (parentId: string) => {
    const addSubsectionRecursive = (
      sections: SectionsState,
      parentId: string
    ): SectionsState => {
      return sections.map((section) => {
        if (section.id === parentId) {
          const newSubsection: Section = {
            id: generateId(),
            title: `Subsection`,
            content: '',
            creatorId: user?.id || '',
            sections: [],
          };
          return { ...section, sections: [...section.sections, newSubsection] };
        }
        if (section.sections.length) {
          return {
            ...section,
            sections: addSubsectionRecursive(section.sections, parentId),
          };
        }
        return section;
      });
    };

    setSections(addSubsectionRecursive(sections, parentId));
  };

  const removeSection = (id: string) => {
    const removeSectionRecursive = (
      sections: SectionsState,
      id: string
    ): SectionsState => {
      return sections.reduce((acc: SectionsState, section) => {
        if (section.id === id) {
          return acc;
        }
        if (section.sections.length) {
          return [
            ...acc,
            {
              ...section,
              sections: removeSectionRecursive(section.sections, id),
            },
          ];
        }
        return [...acc, section];
      }, []);
    };

    setSections(removeSectionRecursive(sections, id));
  };

  return (
    <div>
      {isAuthor && <button onClick={addSection}>Add Section</button>}
      {sections.map((section) => (
        <BookEdit
          key={section.id}
          section={section}
          isAuthor={isAuthor}
          addSubsection={addSubsection}
          removeSection={removeSection}
          updateSection={updateSection}
        />
      ))}
      <button onClick={() => handleSave(sections)}>
        {isNew ? 'Add Book' : 'Save'}
      </button>
    </div>
  );
};

export default BookForm;
