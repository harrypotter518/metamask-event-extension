import React   from 'react'
import Account from "./Infos/Account";
import Balance from "./Infos/Balance";
import Chain   from "./Infos/Chain";
import Web3InterfaceSelector from "./Infos/Web3InterfaceSelector";
import Transaction from "./Infos/Transaction";

export default function Info({ state, web3Handler }) {
    return (
      <div>
        <Account/>
        {!state.isConnected ? (
          `Đapp haven't connected yet`
        ) : (
          <div>
            <p className='text-white mt-7'>Cool  !!!</p>
            <Web3InterfaceSelector web3Handler={web3Handler}/>
            <Chain/>
            <Account/>
            <Balance />
            <Transaction />
          </div>
        )}
      </div>
    )
};
