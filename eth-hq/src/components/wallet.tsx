import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ethFacade } from '../lib';

const Wallet = () => {
  const [balance, setBalance] = useState('0.0');
  const [privatekey, setPrivatekey] = useState('0x');
  const [address, setAddress] = useState('0x');

  const handleImportAccount = () => {
    ethFacade.initWallet(privatekey);
    setAddress(ethFacade.getAccount() as string);
    ethFacade.getEthBalance(address).then((balance) => {
      setBalance(balance as string);
    });
  };

  return (
    // <Container maxWidth="lg">
    <>
      <Box
        sx={{
          m: 2,
          display: 'flex',
          boxShadow: 1,
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography variant="h5" sx={{ m: 1 }}>
          Wallet
        </Typography>

        <Box
          sx={{
            margin: 2,
          }}
        >
          <Typography sx={{ m: 1 }}>Address  {address}</Typography>
          <Typography sx={{ m: 1 }}>Balance  {balance} ETH</Typography>
        </Box>

        <Box
          sx={{
            m: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 400 }}>
            {/* TODO clear field after import */}
            <TextField
              id="outlined-basic"
              label="Private Key"
              variant="outlined"
              onChange={(e) => {
                setPrivatekey(e.target.value);
              }}
            />
          </FormControl>

          <Button sx={{ m: 1 }} variant="contained" onClick={handleImportAccount}>
            Import Account
          </Button>
          {/* <Button sx={{ m: 1 }} variant="contained">
            Generate Random
          </Button> */}
        </Box>
      </Box>
    </>
  );
};

export { Wallet };
