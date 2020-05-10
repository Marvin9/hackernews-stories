import React, { useEffect, useState } from 'react';
import { Box } from 'rebass';
import styled, { keyframes } from 'styled-components';

import { fetchStories, fetchStory, storyPayload } from '../helpers';
import { Loader } from './Loader';

const enterKeyFrames = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
    right: -3px;
  }
`;

const BoxAnimation = styled(Box)<{ delay: number }>`
  animation: ${enterKeyFrames} 0.5s ease;
  animation-delay: ${(props): number => props.delay * 0.1}s;
  animation-fill-mode: forwards;
`;

export const Stories: React.FC = () => {
  const offset = 5;
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [data, updateData] = useState<(storyPayload | null)[]>([]);
  const [score, updateScore] = useState<{ [score: number]: number }>({});
  const [miniLoader, injectMiniLoader] = useState<boolean>(false);

  const increment = 3;
  const maxFont = 30;

  const getNStories = (disableLoader?: boolean): void => {
    const promiseData: Promise<storyPayload | null>[] = storyIds
      .slice(data.length, data.length + offset)
      .map(async (storyId) => {
        if (!storyId) return null;
        const story = await fetchStory(storyId);
        return story;
      });

    Promise.all(promiseData).then((storiesPayload) => {
      if (disableLoader) injectMiniLoader(false);

      updateData([...data, ...storiesPayload]);
    });
  };

  const initialMountStory = React.useRef(true);
  useEffect(() => {
    if (initialMountStory.current) {
      initialMountStory.current = false;
      fetchStories().then((stories) => {
        if (stories) {
          setStoryIds(stories);
        }
      });
    }
  }, []);

  const updateOnEndScroll = (): any => {
    const body = document.querySelector('body');
    if (body && window.innerHeight + window.scrollY >= body.clientHeight) {
      injectMiniLoader(true);
      getNStories(true);
      window.removeEventListener('scroll', updateOnEndScroll);
    }
  };

  const initialMount = React.useRef(true);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      getNStories();
    }
  }, [storyIds]);

  useEffect(() => {
    if (data.length) {
      window.addEventListener('scroll', updateOnEndScroll);
    }
    return (): void => window.removeEventListener('scroll', updateOnEndScroll);
  }, [data]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      let base = 13;
      let tempScore = {};

      data.forEach((sc) => {
        if (sc) {
          tempScore = {
            ...tempScore,
            [sc.score]: base,
          };
        }
      });

      Object.keys(tempScore).forEach((sc) => {
        tempScore = {
          ...tempScore,
          [sc]: base + increment,
        };
        base += increment;
      });

      updateScore(tempScore);
    }
  }, [data]);

  if (data.length) {
    return (
      <>
        <Box
          sx={{
            columnCount: [1, 1, 3],
          }}
          py={[3]}
          px={[1, 2, 4]}
        >
          {data.map((story, ind) =>
            story ? (
              <BoxAnimation
                delay={ind % offset}
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
                mx={2}
                p={4}
                key={story.title}
              >
                <b
                  style={{
                    fontSize: `${Math.min(score[story.score], maxFont)}px`,
                  }}
                >
                  {story.title}
                </b>

                <br />
                <br />

                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: story.text,
                  }}
                />
              </BoxAnimation>
            ) : (
              <>Null</>
            ),
          )}
        </Box>
        {miniLoader && <Loader mini />}
      </>
    );
  }

  return <Loader />;
};
