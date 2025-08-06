import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../../Styles/components/inputs.css';

export default function ImageInput({ value, onChange }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(value || '');  
  const inputRef = useRef();

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      // Cleanup para liberar memória
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof value === 'string') {
      setPreview(value);
    } else {
      setPreview('');
    }
  }, [value]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className='form-group'>
      <label htmlFor={'image'}>Image</label>
      <div
        className={`image-upload${dragActive ? ' drag-active' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragLeave}
      >
        <div
          className='image-dropzone'
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          {preview ? (
            <img
              className='image-preview'
              src={preview}
              alt='Preview'
            />
          ) : (
            <span>Drag and drop an image here or click to select</span>
          )}
        </div>
        <input
          id={'image'}
          ref={inputRef}
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}

ImageInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(File),
  ]),
  onChange: PropTypes.func.isRequired
}; 