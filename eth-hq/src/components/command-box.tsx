import React, { useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import { ethFacade } from '../lib';

export const CommandBox = () => {
  const [command, setCommand] = useState('');

  const handleChange = (e: SelectChangeEvent) => {
    // console.log(e);
    setCommand(e.target.value as string);
  };

  return (
    <>
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
          Execute Command
        </Typography>

        {/* Box yerine div kullanilabilir miydi ?   */}
        <Box
          sx={{
            m: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Command</InputLabel>

            <Select // Buradaki olayi anlamak lazim, ! Bu tarz seyleri neden adam akilli not almiyorum ki?
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={command}
              label="Command"
              onChange={handleChange}
            >
              <MenuItem value={'getBlockByNumber'}>Get Block by Number</MenuItem>
              <MenuItem value={'getTx'}>Get Tx by Hash</MenuItem>
              <MenuItem value={'getBalance'}>Balance of</MenuItem>
              {/* <MenuItem value={'getNetworkId'}>Get Network Id</MenuItem> */}
            </Select>
          </FormControl>
        </Box>

        {command === 'getTx' && <GetTxByHashForm />}
        {command === 'getBlockByNumber' && <GetBlockByNumberForm />}
        {command === 'getBalance' && <BalanceOfForm />}
      </Box>
    </>
  );
};

// TODO gelen komutun form komponent'ini render et
const GetTxByHashForm = () => {
  const [commandResult, setCommandResult] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleClick = () => {
    // console.log(`GetTxForm::handleClick`);
    ethFacade.getTxByHash(txHash).then((tx) => {
      setCommandResult(tx);
    });
  };

  return (
    <>
      <FormControl sx={{ m: 3, minWidth: 200 }}>
        <TextField
          id="outlined-basic"
          label="Tx Hash"
          variant="outlined"
          onChange={(e) => {
            setTxHash(e.target.value);
          }}
        />

        <Button sx={{ marginTop: 2 }} variant="contained" onClick={handleClick}>
          Exec
        </Button>
      </FormControl>

      <Typography variant="h6" sx={{ m: 1 }}>
        Command Response
      </Typography>

      <Typography variant="caption" sx={{ fontFamily: 'monospace', m: 1 }}>
        <pre>{commandResult}</pre>
      </Typography>
    </>
  );
};

const GetBlockByNumberForm = () => {
  const [commandResult, setCommandResult] = useState('');
  const [blockNumber, setBlockNumber] = useState(1);

  const handleClick = () => {
    // console.log(`GetBlockByNumberForm::handleClick`);
    ethFacade.getBlockByNumber(blockNumber).then((tx) => {
      setCommandResult(tx);
    });
  };

  return (
    <>
      <FormControl sx={{ m: 3, minWidth: 200 }}>
        <TextField
          id="outlined-basic"
          label="Block Number"
          variant="outlined"
          onChange={(e) => {
            setBlockNumber(Number(e.target.value));
          }}
        />
      </FormControl>

      <Button sx={{ m: 1 }} variant="contained" onClick={handleClick}>
        Exec
      </Button>

      <Typography variant="h5" sx={{ m: 1 }}>
        Komut Sonucu
      </Typography>

      <Typography variant="caption" sx={{ fontFamily: 'monospace', m: 1 }}>
        <pre>{commandResult}</pre>
      </Typography>
    </>
  );
};

const BalanceOfForm = () => {
  const [commandResult, setCommandResult] = useState('');
  const [account, setAccount] = useState('');

  const handleClick = () => {
    // console.log(`GetBlockByNumberForm::handleClick`);
    ethFacade.getBalance(account).then((tx) => {
      setCommandResult(tx);
    });
  };

  return (
    <>
      <FormControl sx={{ m: 3, minWidth: 200 }}>
        <TextField
          id="outlined-basic"
          label="Account"
          variant="outlined"
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
      </FormControl>

      <Button sx={{ m: 1 }} variant="contained" onClick={handleClick}>
        Exec
      </Button>

      <Typography variant="h5" sx={{ m: 1 }}>
        Command Response
      </Typography>

      <Typography variant="caption" sx={{ fontFamily: 'monospace', m: 1 }}>
        <pre>{commandResult}</pre>
      </Typography>
    </>
  );
};
