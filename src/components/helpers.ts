import { RandomBoxStyle, theme } from './Stories/styles';

const API_PREFIX = 'https://hacker-news.firebaseio.com/v0';

export const HN_STORIES_API = `${API_PREFIX}/askstories.json`;

export const HN_STORY = (id: number): string => `${API_PREFIX}/item/${id}.json`;

export const fetchStories = async (): Promise<number[] | null> => {
  try {
    const response = await fetch(HN_STORIES_API);
    const storiesId: number[] = await response.json();
    return storiesId;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export type storyPayload = {
  title: string;
  text: string;
  score: number;
  theme: theme;
  [otherKeys: string]: any;
};

export const fetchStory = async (storyId: number): Promise<storyPayload | null> => {
  try {
    const response = await fetch(HN_STORY(storyId));
    const story: storyPayload = await response.json();

    return {
      title: story.title,
      text: story.text,
      score: story.score,
      theme: RandomBoxStyle(),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
