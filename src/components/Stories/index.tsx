import React, { useEffect, useState } from 'react';
import { Box } from 'rebass';

import { fetchStories, fetchStory, storyPayload } from '../helpers';
import { Loader } from './components/Loader';
import { Story } from './components/Story';

interface StoriesProps {
  fontTitleIncrement?: number;
  storiesOffset?: number;
  maxFontSize?: number;
}

export const Stories: React.FC<StoriesProps> = ({ fontTitleIncrement = 3, storiesOffset = 5, maxFontSize = 30 }) => {
  const offset = storiesOffset;
  const increment = fontTitleIncrement;
  const maxFont = maxFontSize;

  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [data, updateData] = useState<(storyPayload | null)[]>([]);
  const [score, updateScore] = useState<{ [score: number]: number }>({});
  const [miniLoader, injectMiniLoader] = useState<boolean>(false);

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
  // fetch story IDs
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

  // If scroll to end of screen, Load more story
  const updateOnEndScroll = (): any => {
    const body = document.querySelector('body');
    if (body && window.innerHeight + window.scrollY >= body.clientHeight) {
      injectMiniLoader(true);
      getNStories(true);
      window.removeEventListener('scroll', updateOnEndScroll);
    }
  };

  // once all story IDs are fetched, get content of each ${offset} stories
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

  // Decide font size for each title of story
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      // minimum font size 13
      let base = 13;
      let tempScore = {};

      // store each score
      data.forEach((sc) => {
        if (sc) {
          tempScore = {
            ...tempScore,
            [sc.score]: base,
          };
        }
      });

      // keys(scores) will be in increased order
      // Iterate each of them and update score value to ${increment} from base
      // increment base as well
      Object.keys(tempScore).forEach((sc) => {
        tempScore = {
          ...tempScore,
          [sc]: base + increment,
        };
        base += increment;
      });

      // finally update inject score
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
          px={[0, 0, 4]}
        >
          {data.map((story, ind) =>
            story ? (
              <Story story={story} animationDelay={ind % offset} titleFontSize={Math.min(score[story.score], maxFont)}>
                {{
                  title: story.title,
                  content: story.text,
                }}
              </Story>
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
