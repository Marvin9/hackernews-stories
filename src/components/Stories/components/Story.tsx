import React from 'react';

import { storyPayload } from '../../helpers';

import { BoxAnimation } from './styles';

interface StoryProps {
  story: storyPayload;
  animationDelay: number;
  titleFontSize: number;
  children: {
    title: string;
    content: string;
  };
}

export const Story: React.FC<StoryProps> = ({ story, animationDelay, titleFontSize, children }) => (
  <BoxAnimation
    delay={animationDelay}
    sx={{
      position: 'relative',
      right: '3px',
      opacity: 0,
      wordBreak: 'break-word',
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
      ':-webkit-column-break-inside': 'avoid',
      boxShadow: '3px 4px 10px -5px rgba(0,0,0,0.75)',
      cursor: 'pointer',
      '&: hover': {
        boxShadow: '3px 4px 11px -4px rgba(0,0,0,0.75)',
      },
      transition: '0.5s',
      ...story.theme,
    }}
    my={4}
    mx={[0, 0, 2]}
    p={4}
  >
    <b
      style={{
        fontSize: `${titleFontSize}px`,
      }}
    >
      {children.title}
    </b>

    <br />
    <br />

    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: children.content,
      }}
    />
  </BoxAnimation>
);
