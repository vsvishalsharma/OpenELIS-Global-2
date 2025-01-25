import React, { useState } from 'react';
import { 
  HeaderGlobalAction, 
  HeaderPanel,
} from "@carbon/react";
import { 
  Help, 
} from "@carbon/icons-react";

const HelpMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => setIsExpanded(!isExpanded);

  const openHelp = (type) => {
    let url;
    switch(type) {
      case 'manual':
        url = 'https://uwdigi.atlassian.net/wiki/spaces/OG/folder/261455874';
        break;
      case 'tutorials':
        url = 'https://video.openelis-global.org';
        break;
      case 'release-notes':
        url = 'https://roadmap.openelis-global.org';
        break;
      default:
        return;
    }
    window.open(url, '_blank');
    setIsExpanded(false);
  };

  return (
    <>
      <HeaderGlobalAction
        aria-label="Help"
        onClick={togglePanel}
        isActive={isExpanded}
      >
        <Help size={20} />
      </HeaderGlobalAction>

      <HeaderPanel
        aria-label="Help Panel"
        expanded={isExpanded}
        style={{
          background: ' #295785',
          color: 'white'
        }}
      >
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {['manual', 'tutorials', 'release-notes'].map((type) => (
            <li key={type}>
              <button 
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'white'
                }}
                onClick={() => openHelp(type)}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <Help size={16} />
                {type === 'manual' ? 'User Manual' : 
                 type === 'tutorials' ? 'Video Tutorials' : 
                 'Release Notes'}
              </button>
            </li>
          ))}
        </ul>
      </HeaderPanel>
    </>
  );
};

export default HelpMenu;