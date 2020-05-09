import React, { useEffect, useState } from 'react';
import { Box } from 'rebass';

import { fetchStories, fetchStory, storyPayload } from '../helpers';

export const Stories: React.FC = () => {
  const [data, updateData] = useState<(storyPayload | null)[]>([]);

  useEffect(() => {
    fetchStories().then((stories) => {
      if (stories) {
        const promiseData: Promise<storyPayload | null>[] = stories
          .slice(0, 6)
          .map(async (storyId) => {
            if (!storyId) return null;
            const story = await fetchStory(storyId);
            return story;
          })
          .filter(Boolean);

        Promise.all(promiseData).then((storiesPayload) => {
          updateData(storiesPayload);
        });
      }
    });
  }, []);

  if (data.length) {
    return (
      <Box
        sx={{
          columnCount: [1, 2, 3],
        }}
        py={[3]}
        px={[1, 2, 4]}
      >
        {data.map((story) =>
          story ? (
            <Box
              sx={{
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
              }}
              my={4}
              mx={3}
              p={4}
              key={story.title}
            >
              <b>{story.title}</b>
              <br />
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: story.text,
                }}
              />
            </Box>
          ) : (
            <>Null</>
          ),
        )}
      </Box>
    );
  }

  return <>Loading...</>;
};
