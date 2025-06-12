import { Box } from '@mui/material';

export default function ErrorPage({ error }: { error: Error }) {
  console.error('Error occurred:', error);

  if (!error) return console.error('No error object provided');

  return (
    <Box
      component={'main'}
      sx={{
        'background-image': 'url(img/common_bg.png)',
        'background-repeat': 'round',
      }}
    >
      ${error.message || 'An unexpected error occurred.'}
    </Box>
  );
}
