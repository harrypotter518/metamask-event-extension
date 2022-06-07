import { useEffect, useState } from "react";
import { useMetamask }         from "use-metamask";

export default function Balance() {
  const { metaState }         = useMetamask();
  const [balance, setBalance] = useState();

  useEffect(() => {
    const { account, isConnected, web3 } = metaState;
      // setInterval(() => {
      //   if (account.length && isConnected && web3) {
      //     (async () => {
      //       let _balance;
      //       console.log("sdsdsd======");
      //       const dd= await metaState.web3;

      //       console.log(dd);
            
      //       if (web3?.eth) {
            
      //         _balance = await metaState.web3.eth.getBalance(metaState.account[0]);
      //       } else {
      //         _balance = await metaState.web3.getBalance(metaState.account[0]);
      //       }
      //       setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
      //     })();
      //   }
      // }, 10);
      
        if (account.length && isConnected && web3) {
          (async () => {
            let _balance;
            console.log("sdsdsd======");
            const dd= await metaState.web3;

            console.log(dd);
            
            if (web3?.eth) {
            
              _balance = await metaState.web3.eth.getBalance(metaState.account[0]);
            } else {
              _balance = await metaState.web3.getBalance(metaState.account[0]);
            }
            setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
          })();
        };
      
    
  }, [metaState]);

  return (
    <p>
      {Number(balance) ? (
        <>
          And you have{" "}
          <b>
            <code>{balance} ETH</code>
          </b>{" "}
          😲
        </>
      ) : (
        "But you don't have any ETH 😔"
      )}
    </p>
  );
}
