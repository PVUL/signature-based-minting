import { useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFTCollection,
  useSigner,
} from '@thirdweb-dev/react';
import { ChainId, ThirdwebSDK } from '@thirdweb-dev/sdk';

export const MintYourNft = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const isOnWrongNetwork = useNetworkMismatch();
  const signer = useSigner();
  const [, switchNetwork] = useNetwork();

  // Fetch the NFT collection from thirdweb via it's contract address.
  const nftCollection = useNFTCollection(
    // Replace this with your NFT Collection contract address
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS
  );

  // Here we store the user inputs for their NFT.
  const [nftName, setNftName] = useState<string>('');
  const [file, setFile] = useState<File>();

  // Magic to get the file upload even though its hidden
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function to store file in state when user uploads it
  const uploadFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();

      fileInputRef.current.onchange = () => {
        if (fileInputRef?.current?.files?.length) {
          const file = fileInputRef.current.files[0];
          setFile(file);
        }
      };
    }
  };

  // This function calls a Next JS API route that mints an NFT with signature-based minting.
  // We send in the address of the current user, and the text they entered as part of the request.
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
      if (!file || !nftName) {
        alert('Please enter a name and upload a file.');
        return;
      }

      if (!address || !signer) {
        alert('Please connect to your wallet.');
        return;
      }

      // Upload image to IPFS using the sdk.storage
      const tw = new ThirdwebSDK(signer);
      const upload = await tw.storage.upload(file);
      const url = `${upload.uris[0]}`;

      // Make a request to /api/server
      const signedPayloadReq = await fetch(`/api/server`, {
        method: 'POST',
        body: JSON.stringify({
          minterAddress: address, // Address of the current user -- NOTE: this is going to be the minter's address
          nftName: nftName, // this will come from sanity
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

  return (
    <>
      <div className={styles.collectionContainer}>
        <h2 className={styles.ourCollection}>
          Mint your own NFT into the collection:
        </h2>

        <input
          type="text"
          placeholder="Name of your NFT"
          className={styles.textInput}
          maxLength={26}
          onChange={(e) => setNftName(e.target.value)}
        />

        {file ? (
          <img
            src={URL.createObjectURL(file)}
            style={{ cursor: 'pointer', maxHeight: 250, borderRadius: 8 }}
            onClick={() => setFile(undefined)}
          />
        ) : (
          <div
            className={styles.imageInput}
            onClick={uploadFile}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setFile(e.dataTransfer.files[0]);
            }}
          >
            Drag and drop an image here to upload it!
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        id="profile-picture-input"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      <div style={{ marginTop: 24 }}>
        {address ? (
          <a className={styles.mainButton} onClick={mintWithSignature}>
            Mint NFT
          </a>
        ) : (
          <a className={styles.mainButton} onClick={connectWithMetamask}>
            Connect Wallet
          </a>
        )}
      </div>
    </>
  );
};
