import React, { useState } from 'react';
import { 
  HeaderGlobalAction, 
  HeaderPanel, 
  Modal,
  Tag
} from "@carbon/react";
import { 
  Help, 
  ArrowLeft, 
  Search 
} from "@carbon/icons-react";

const VideoTutorialCard = ({ videoId, title, description, onWatch }) => (
  <div 
    className="tutorial-card"
    role="button"
    tabIndex="0"
    onClick={onWatch}
    onKeyDown={(e) => e.key === 'Enter' && onWatch()}
  >
    <div className="tutorial-thumbnail">
      <img 
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={`${title} tutorial thumbnail`}
        loading="lazy"
      />
      <div className="thumbnail-overlay">
        <svg className="play-icon" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="white"/>
        </svg>
      </div>
    </div>
    <div className="tutorial-info">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const VideoPlayer = ({ videoId, title, onBack }) => (
  <div className="video-player-container">
    <div className="video-player-header">
      <button 
        onClick={onBack}
        className="back-button"
        aria-label="Back to tutorials"
      >
        <ArrowLeft size={20} />
        <span>Back to tutorials</span>
      </button>
    </div>
    <div className="video-content">
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div>
);

const UserManual = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Mock search implementation
    const mockResults = [
      { title: "Getting Started", link: "#getting-started" },
      { title: "User Permissions", link: "#user-permissions" }
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(mockResults);
  };

  const tableOfContents = [
    { section: "Introduction", subsections: ["About OpenELIS", "System Requirements"] },
    { section: "User Management", subsections: ["Login", "Roles", "Permissions"] },
    { section: "Lab Workflow", subsections: ["Sample Registration", "Testing", "Reporting"] }
  ];

  return (
    <div className="user-manual">
      <div className="manual-sidebar">
        <div className="manual-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <a 
                  key={index} 
                  href={result.link} 
                  className="search-result-item"
                >
                  {result.title}
                </a>
              ))}
            </div>
          )}
        </div>
        <nav className="manual-toc">
          <h3>Table of Contents</h3>
          {tableOfContents.map((section, index) => (
            <div key={index} className="toc-section">
              <h4>{section.section}</h4>
              <ul>
                {section.subsections.map((subsection, subIndex) => (
                  <li key={subIndex}>{subsection}</li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="manual-content">
        <iframe 
          src="https://uwdigi.atlassian.net/wiki/spaces/OG/folder/261455874"
          title="User Manual"
          className="manual-iframe"
        />
      </div>
    </div>
  );
};

const HelpMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    view: 'list'
  });

  const videoTutorials = [
    {
      title: "What is OpenELIS?",
      description: "Introduction to the system",
      videoId: "YZQMHHaHIcY"
    },
    {
      title: "Analyzer Interface Development",
      description: "Building clinical analyzer interfaces",
      videoId: "g8nvPrVGuAU"
    },
    {
      title: "Lab Workflow Management",
      description: "Sample tracking and optimization",
      videoId: "MReLJoiDcwc"
    },
    {
      title: "System Architecture Overview",
      description: "Technical infrastructure deep dive",
      videoId: "r3Pd0DDIRbM"
    },
    {
      title: "User Training Series",
      description: "Administrator training playlist",
      videoId: "PLtLYwvBiYeK2moruYtMXuZJXc-8QDi_vb"
    }
  ];

  const togglePanel = () => setIsExpanded(!isExpanded);

  const openHelp = (type) => {
    if (type === 'manual') {
      window.open('https://uwdigi.atlassian.net/wiki/spaces/OG/folder/261455874', '_blank');
      setIsExpanded(false);
      return;
    }

    setModalState({
      isOpen: true,
      type,
      view: 'list'
    });
    setIsExpanded(false);
  };

  const closeModal = () => setModalState({ isOpen: false, type: null, view: 'list' });

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
        className="help-panel"
      >
        <ul className="help-menu-list">
          <li>
            <button 
              className="help-menu-item"
              onClick={() => openHelp('manual')}
            >
              <Help size={16} />
              User Manual
            </button>
          </li>
          <li>
            <button 
              className="help-menu-item"
              onClick={() => openHelp('tutorials')}
            >
              <Help size={16} />
              Video Tutorials
            </button>
          </li>
          <li>
            <button 
              className="help-menu-item"
              onClick={() => openHelp('release-notes')}
            >
              <Help size={16} />
              Release Notes
            </button>
          </li>
        </ul>
      </HeaderPanel>

      <Modal
        open={modalState.isOpen}
        onRequestClose={closeModal}
        modalHeading={
          modalState.type === 'tutorials' ? 
            (modalState.view === 'video' ? modalState.selectedTutorial?.title : 'Video Tutorials') :
            'Release Notes'
        }
        size={modalState.type === 'tutorials' ? 'lg' : 'md'}
        passiveModal={true}
        className="help-modal"
        primaryButtonText={null}
        secondaryButtonText={null}
      >
        {modalState.type === 'tutorials' && modalState.view === 'list' && (
          <div 
            className="tutorials-list-container"
            role="region"
            aria-label="Video tutorials list"
            tabIndex="0"
          >
            {videoTutorials.map((tutorial, index) => (
              <VideoTutorialCard
                key={index}
                {...tutorial}
                onWatch={() => setModalState(prev => ({
                  ...prev,
                  view: 'video',
                  selectedTutorial: tutorial
                }))}
              />
            ))}
          </div>
        )}

        {modalState.type === 'tutorials' && modalState.view === 'video' && (
          <VideoPlayer
            videoId={modalState.selectedTutorial.videoId}
            title={modalState.selectedTutorial.title}
            onBack={() => setModalState(prev => ({...prev, view: 'list'}))}
          />
        )}

        {modalState.type === 'release-notes' && (
          <div className="release-notes-content">
            <div className="version-header">
              <Tag type="blue" className="version-tag">Latest</Tag>
              <div className="version-details">
                <h3>Version 2.8.3.1</h3>
                <span className="release-date">Released: August 15, 2023</span>
              </div>
            </div>
            <div className="release-notes-list">
              <div className="release-category">
                <h4>New Features</h4>
                <ul>
                  <li>Enhanced help system with video tutorials</li>
                  <li>New sample tracking workflow</li>
                </ul>
              </div>
              
              <div className="release-category">
                <h4>Improvements</h4>
                <ul>
                  <li>Improved user management interface</li>
                  <li>Updated reporting module</li>
                </ul>
              </div>
              
              <div className="release-category">
                <h4>Bug Fixes</h4>
                <ul>
                  <li>Fixed sample registration validation issues</li>
                  <li>Resolved permission synchronization problems</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        /* Focus State Fixes */
        .cds--btn:focus,
        .tutorial-card:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--cds-background, #295785);
        }

        video:focus,
        iframe:focus {
          outline: none;
          box-shadow: none;
        }

        /* Core Styles */
        .help-panel,
        .help-modal .bx--modal-container,
        .manual-sidebar,
        .tutorial-card,
        .release-notes-content {
          background: var(--cds-background, #295785) !important;
          color: white !important;
        }

        .help-menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .help-menu-item {
          width: 100%;
          padding: 1rem 1.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white !important;
        }

        .help-menu-item:hover {
          background: rgba(255,255,255,0.15) !important;
          transform: translateX(4px);
        }

        .tutorials-list-container {
          max-height: 60vh;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .tutorial-card {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 1.5rem;
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .tutorial-card:hover {
          background: rgba(255,255,255,0.1) !important;
          transform: translateX(4px);
        }

        .tutorial-thumbnail {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          aspect-ratio: 16/9;
        }

        .thumbnail-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .tutorial-card:hover .thumbnail-overlay {
          opacity: 1;
        }

        .play-icon {
          width: 48px;
          height: 48px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          transition: transform 0.2s ease;
        }

        .tutorial-card:hover .play-icon {
          transform: scale(1.1);
        }

        .video-player-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
        }

        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .back-button {
          background: rgba(255,255,255,0.1) !important;
          border: none !important;
          color: white !important;
          cursor: pointer;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-button:hover {
          background: rgba(255,255,255,0.2) !important;
        }

        /* User Manual Styles */
        .user-manual {
          display: grid;
          grid-template-columns: 280px 1fr;
          height: 80vh;
        }

        .manual-search input {
          background: rgba(255,255,255,0.1) !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.3);
          padding-left: 2rem;
        }

        .manual-toc li {
          padding: 0.5rem 1rem;
          transition: all 0.2s ease;
        }

        .manual-toc li:hover {
          background: rgba(255,255,255,0.1) !important;
          color: #a6c8ff !important;
        }

        /* Modal Adjustments */
        .help-modal .bx--modal-header {
          border-bottom: 1px solid rgba(255,255,255,0.2) !important;
        }

        .help-modal .bx--modal-close {
          color: white !important;
        }

        /* Release Notes Styling */
        .release-notes-content {
          padding: 1rem;
        }

        .version-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(255,255,255,0.15);
        }

        .version-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .version-tag {
          background: #0043ff !important;
          color: white !important;
          font-weight: 600;
        }

        .release-date {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.7);
          font-style: italic;
        }

        .release-category {
          margin: 1.5rem 0;
        }

        .release-category h4 {
          color: #7cc7ff;
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .release-category ul {
          list-style: none;
          padding-left: 1.5rem;
          margin: 0;
        }

        .release-category li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.9);
        }

        .release-category li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #7cc7ff;
          font-size: 1.2rem;
          line-height: 1;
        }

        /* Hide Carbon's default modal buttons */
        .help-modal .bx--modal-footer {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default HelpMenu;