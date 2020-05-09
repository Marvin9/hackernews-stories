import React from 'react';
import { Text } from 'rebass';
import { ThemeProvider } from 'theme-ui';
import preset from '@rebass/preset';

import { Stories } from './components';

export const App: React.FC = () => (
  <ThemeProvider theme={preset}>
    <Text px={4}>
      <h1>
        <u>Hacker News Stories : </u>
      </h1>
    </Text>
    <Stories />
  </ThemeProvider>
);
