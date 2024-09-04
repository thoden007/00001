import React, { useEffect, useRef } from 'react';

const AutoPaste = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handlePaste = () => {
      if (inputRef.current) {
        inputRef.current.value = 'This is the auto-pasted content';
      }
    };

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        document.execCommand('paste');
      }
    };

    const button = document.getElementById('auto-paste-button');
    if (button) {
      button.addEventListener('click', handleClick);
    }

    document.addEventListener('paste', handlePaste);

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
      }
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to auto-paste"
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      <button
        id="auto-paste-button"
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Auto Paste
      </button>
    </div>
  );
};

export default AutoPaste;
