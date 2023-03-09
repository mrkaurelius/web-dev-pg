import { Box } from '@mui/material';
import React, { useState } from 'react';

const CommandHistory = () => {
  const [entry, setEntry] = useState([]);

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxShadow: 1,
      }}
    ></Box>
  );
};

export { CommandHistory };
