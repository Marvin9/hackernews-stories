import styled, { keyframes } from 'styled-components';
import { Box } from 'rebass';

const enterKeyFrames = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1;
  right: -3px;
}
`;

export const BoxAnimation = styled(Box)<{ delay: number }>`
  animation: ${enterKeyFrames} 0.5s ease;
  animation-delay: ${(props): number => props.delay * 0.1}s;
  animation-fill-mode: forwards;
`;
