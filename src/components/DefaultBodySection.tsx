import React from 'react';

interface DefaultBodySectionProps {
  borderTop?: boolean;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  reverseOnMobile?: boolean; 
}

const DefaultBodySection: React.FC<DefaultBodySectionProps> = ({
  borderTop = true,
  leftContent,
  rightContent,
  reverseOnMobile = false,
}) => {
  
  const containerClasses = `
    flex gap-8 pt-5  pb-12
    ${reverseOnMobile ? 'lg:flex-row-reverse' : 'lg:flex-row'}
  `;

  const itemClasses = 'w-full lg:w-1/2'; 

  return (
    <div className={` ${borderTop ? 'border-t border-zinc-700' : ''}`} >
      <div className={containerClasses}>
        <div className={itemClasses}>
          {leftContent}
        </div>
        
        <div className={itemClasses}>
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default DefaultBodySection;