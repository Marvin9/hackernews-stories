import { SxStyleProp } from 'rebass';

export const BoxStyles: SxStyleProp[] = [
  {
    backgroundColor: '#2191FB',
    color: 'white',
  },
  {
    backgroundColor: '#E0479E',
    color: 'white',
  },
  {
    backgroundColor: '#59A96A',
    color: 'white',
  },
  {
    backgroundColor: '#D81159',
    color: 'white',
  },
  {
    backgroundColor: '#EE7B30',
    color: 'white',
  },
  {
    backgroundColor: '#02040F',
    color: 'white',
  },
];

export const RandomBoxStyle = (): SxStyleProp => BoxStyles[Math.floor(Math.random() * BoxStyles.length)];
