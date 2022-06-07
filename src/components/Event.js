import React, { useState } from "react";
import { ethers } from "ethers";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
  
function Event() {
  const [data, setdata] = useState({
    From: "",
    To: "",
    gasLimit: "",
    gasPrice: "",
    blockHash: "",
    chainId: "",
    blockNumber: "",
    nonce: "",
    Value: "",
    address: "",
    Balance: ""
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()

  provider.on("block", async (blockNumber) => {
    const transactions = await provider.getBlockWithTransactions(blockNumber);
    const myAddress = await signer.getAddress();

    for(var i = 0; i < transactions.transactions.length; i ++) {
      if(transactions.transactions[i].from ===  myAddress) {
        setdata({
          From: transactions.transactions[i].from,
          To: transactions.transactions[i].to,
          gasLimit: ethers.utils.formatEther(ethers.BigNumber.from(transactions.transactions[i].gasLimit).toString()),
          gasPrice: ethers.utils.formatEther(ethers.BigNumber.from(transactions.transactions[i].gasPrice).toString()),
          blockHash: transactions.transactions[i].blockHash,
          chainId: transactions.transactions[i].chainId,
          blockNumber: transactions.transactions[i].blockNumber,
          nonce: transactions.transactions[i].nonce,
          Value: ethers.utils.formatEther(ethers.BigNumber.from(transactions.transactions[i].value).toString()),
          address: myAddress,
          Balance: ethers.utils.formatEther(await provider.getBalance(transactions.transactions[i].from)),
        })
      }
    }
  })
  
  
  const btnhandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  const accountChangeHandler = (account) => {
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [account, "latest"] 
      })
      .then((balance) => {
        setdata({
          Balance: ethers.utils.formatEther(balance),
          address: account
        });
      });
  };
  
  return (
    <div className="App mt-32 flex flex-col gap-5">
      { data.From && 
        <div>
          <h3>From : <strong>{data.From}</strong></h3>
        </div>
      }
      
      { data.To && 
        <div>
          <h3>To : <strong>{data.To}</strong></h3>
        </div>
      }

      { data.gasLimit && 
        <div>
          <h3>gasLimit : <strong>{data.gasLimit}</strong></h3>
        </div>
      }

      { data.gasPrice && 
        <div>
          <h3>gasPrice : <strong>{data.gasPrice}</strong></h3>
        </div>
      }

      { data.blockHash && 
        <div>
          <h3>blockHash : <strong>{data.blockHash}</strong></h3>
        </div>
      }

      { data.chainId && 
        <div>
          <h3>chainId : <strong>{data.chainId}</strong></h3>
        </div>
      }

      { data.blockNumber && 
        <div>
          <h3>blockNumber : <strong>{data.blockNumber}</strong></h3>
        </div>
      }

      { data.nonce && 
        <div>
          <h3>nonce : <strong>{data.nonce}</strong></h3>
        </div>
      }

      { data.Value && 
        <div>
          <h3>Value : <strong>{data.Value}</strong></h3>
        </div>
      }

      { data.address && 
        <div>
          <h3>My address : <strong>{data.address}</strong></h3>
        </div>
      }

      { data.Balance && 
        <div>
          <h3>Balance : <strong>{data.Balance}</strong> ETH</h3>
        </div>
      }

      <div>
        <button onClick={btnhandler} className="bg-slate-800 hover:bg-slate-600 text-white p-3" >
          Connect to wallet
        </button>
      </div>   
    </div>
  );
}
  
export default Event;