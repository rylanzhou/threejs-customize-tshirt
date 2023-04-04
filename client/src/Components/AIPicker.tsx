import React from 'react';
import CustomButton from './CustomButton';

interface AIPickerProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  generatingImg: boolean;
  handleSubmit: (type: 'logo' | 'full') => void;
}

export default function AIPicker({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: AIPickerProps) {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton type="outline" title="Asking AI..." customStyles="text-xs" />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
}
