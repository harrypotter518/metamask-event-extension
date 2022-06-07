
import './App.css';
import { useEffect, useState } from "react";
import { useMetamask }         from "use-metamask";
import { ethers }              from "ethers";
// import Web3                    from "web3";

import Header                    from "./components/Header";
import Event                    from "./components/Event";
import Info                    from "./components/Info";

function App() {
  const { connect, metaState }              = useMetamask();
  const [ web3interface, setWeb3Interface ] = useState("ethers");

  useEffect(() => {
    if (metaState.isAvailable && !metaState.isConnected) {
      (async () => {
        try {
          console.log("metaState=",metaState);
          if (web3interface === "ethers")
            await connect(ethers.providers.Web3Provider, "any");       
          // else if (web3interface === "web3")
          //   await connect(Web3);
          else 
            throw Error(`Unknown web3 interface: ${web3interface}`);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [metaState.isAvailable, web3interface]);

  const handleWeb3Selector = (event) => setWeb3Interface(event.target.value);

  return (
    <div className="container mx-[5vw]">

      <Header/> 
      <Event/>

      {/* {
        metaState.isAvailable
        ? <Info state={metaState} web3Handler={handleWeb3Selector}/>
        : <div>
          <p>You don't have Metamask installed</p>
          <p>But wait, what is Metamask?</p>
          <p>
            <code>
              <a href="https://metamask.io/">https://metamask.io</a>
            </code>
          </p>
        </div>
      } */}


    </div>
  );
}
export default App;


