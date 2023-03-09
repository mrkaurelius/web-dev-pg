import React from 'react';

import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from '@mui/material';

// inline component prop typing

export const InfoBox = ({ networkID, blockHeight }: { networkID: number; blockHeight: number }) => {
  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" sx={{ m: 1 }}>
        Network Info
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableBody sx={{ m: 2 }}>
            <TableRow>
              <TableCell component="th" scope="row">
                Network ID
              </TableCell>
              <TableCell>{networkID}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Block Height
              </TableCell>
              <TableCell>{blockHeight}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
