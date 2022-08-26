import {
  ThirdwebNftMedia,
  useNetwork,
  useNetworkMismatch,
  useNFTCollection,
  useNFTs,
  useSigner,
} from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import { Gallery } from '../components/Gallery';
import { localNfts } from '../data';
import { Header } from '../components/Header';

// import styles from '../styles/Home.module.css';

// import { ChainId } from '@thirdweb-dev/sdk';
// import { useState } from 'react';
// import { MintYourNft } from '../components/MintYourNft';

const Home: NextPage = () => {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const signer = useSigner();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Fetch the NFT collection from thirdweb via it's contract address.
  const nftCollection = useNFTCollection(
    // Replace this with your NFT Collection contract address
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS
  );

  const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection);

  // This function calls a Next JS API route that mints an NFT with signature-based minting.
  // We send in the address of the current user, and the text they entered as part of the request.
  /** we going to comment this out for now... we should move this into it's own call file

  const mintWithSignature = async () => {
    if (!address) {
      connectWithMetamask();
      return;
    }

    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
      return;
    }

    try {
      if (!address || !signer) {
        alert('Please connect to your wallet.');
        return;
      }

      // pvul
      // use dummy data to see if we can
      // use our own custom collection
      const n = localNfts[0];
      const url = n.url;

      // Make a request to /api/server
      const signedPayloadReq = await fetch(`/api/server`, {
        method: 'POST',
        body: JSON.stringify({
          minterAddress: address, // Address of the current user -- NOTE: this is going to be the minter's address
          nftName: n.name, // this will come from sanity
          imagePath: url, // this will come from ipfs via sanity
        }),
      });

      console.log('Received Signed payload', signedPayloadReq);

      // Grab the JSON from the response
      const json = await signedPayloadReq.json();

      console.log('Json:', json);

      // If the request failed, we'll show an error.
      if (!signedPayloadReq.ok) {
        alert(json.error);
        return;
      }

      // If the request succeeded, we'll get the signed payload from the response.
      // The API should come back with a JSON object containing a field called signedPayload.
      // This line of code will parse the response and store it in a variable called signedPayload.
      const signedPayload = json.signedPayload;

      // Now we can call signature.mint and pass in the signed payload that we received from the server.
      // This means we provided a signature for the user to mint an NFT with.
      const nft = await nftCollection?.signature.mint(signedPayload);

      console.log('Successfully minted NFT with signature', nft);

      alert('Successfully minted NFT with signature');

      return nft;
    } catch (e) {
      console.error('An error occurred trying to mint the NFT:', e);
    }
  };

  */

  // mx-auto md:flex-col md:min-h-screen sm:flex-row sm:min-w-screen

  return (
    <div className="flex sm:flex-col">
      <Header className={`h-14 sm:w-64 sm:h-screen`} />
      <Gallery collection={localNfts} className={`mt-14 sm:mt-0 sm:ml-64`} />
    </div>
  );
};

//       <div className="grid space-x-3">

//         <MintYourNft />

//         <div>
//           <h2>Other NFTs in this collection:</h2>

//           {loadingNfts ? (
//             <p>Loading...</p>
//           ) : (
//             <div>
//               {nfts?.map((nft) => (
//                 <div key={nft.metadata.id.toString()}>
//                   <div>
//                     <ThirdwebNftMedia
//                       metadata={nft.metadata}
//                       style={{
//                         height: 90,
//                         borderRadius: 16,
//                       }}
//                     />
//                   </div>
//                   <div style={{ textAlign: 'center' }}>
//                     <p>Named</p>
//                     <p>
//                       <b>{nft.metadata.name}</b>
//                     </p>
//                   </div>

//                   <div style={{ textAlign: 'center' }}>
//                     <p>Owned by</p>
//                     <p>
//                       <b>
//                         {nft.owner
//                           .slice(0, 6)
//                           .concat('...')
//                           .concat(nft.owner.slice(-4))}
//                       </b>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>

//   );
// };

export default Home;
