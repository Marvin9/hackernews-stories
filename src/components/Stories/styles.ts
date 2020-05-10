export type theme = {
  backgroundColor: string;
  color: string;
};

export const BoxStyles: theme[] = [
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

export const RandomBoxStyle = (): theme => BoxStyles[Math.floor(Math.random() * BoxStyles.length)];
