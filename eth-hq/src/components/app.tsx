import React, { useEffect, useState } from 'react';

import { InfoBox } from './info-box';
import { ethFacade } from '../lib';
import { CommandBox } from './command-box';
import { Wallet } from './wallet';
import { Navbar } from './navbar';

export default function App() {
  const [networkID, setNetworkID] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);

  //? is setInterval + useEffect sensible ?
  useEffect(() => {
    ethFacade.getNetworkId().then((networkID) => {
      setNetworkID(networkID);
    });

    setInterval(() => {
      ethFacade.getBlockHeight().then((blockHeight) => {
        setBlockHeight(blockHeight);
      });
    }, 1000);
  }, [blockHeight, networkID, setBlockHeight, setNetworkID]);

  // TODO understand events
  // const handleChange = (e: SelectChangeEvent) => {
  //   setCommand(e.target.value as string);
  // };

  return (
    <>
      <Navbar></Navbar>
      <InfoBox blockHeight={blockHeight} networkID={networkID} />
      <Wallet />
      <CommandBox />
    </>
  );
}
