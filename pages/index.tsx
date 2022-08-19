import {
  ThirdwebNftMedia,
  useAddress,
  useDisconnect,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFTCollection,
  useNFTs,
  useSigner,
} from '@thirdweb-dev/react';
import type { NextPage } from 'next';
// import styles from '../styles/Home.module.css';

// import { ChainId } from '@thirdweb-dev/sdk';
// import { useState } from 'react';
// import { MintYourNft } from '../components/MintYourNft';

// dummy data for local dev testing
let localNfts = [
  {
    id: 0, // Unique ID for each NFT corresponding to its position in the array
    name: 'NFT 1', // A name for the NFT
    description: 'This is our first amazing NFT', // Description for the NFT
    url: 'https://ipfs.io/ipfs/bafybeih7qusbk3vz7afvtvu6s4r25mj2jjzttnxi577hsfxb64hierrcqm', // URL for the NFT image
    price: 0.01, // The price of the NFT
    minted: false, // A variable to indicate if the NFT has been minted
  },
  {
    id: 1, // Unique ID for each NFT corresponding to its position in the array
    name: 'NFT 2', // A name for the NFT
    description: 'This is our first amazing NFT', // Description for the NFT
    url: 'https://gateway.thirdweb.dev/ipfs/Qmd8ErisuuW3Ps2MJy4NeUwCy4Lz578dc7RbCVLHufi5rn/0.jpeg', // URL for the NFT image
    price: 0.01, // The price of the NFT
    minted: false, // A variable to indicate if the NFT has been minted
  },
  // Add more NFTs here...
];

const Home: NextPage = () => {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
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

  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt:
        'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt:
        'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt:
        'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt:
        'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ];

  return (
    <div>
      {/* Header */}
      <div>
        <div>
          <div>
            <a
              href="https://thirdweb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`/logo.png`} alt="Thirdweb Logo" width={135} />
            </a>
          </div>
        </div>
        <div>
          {address ? (
            <>
              <a onClick={() => disconnectWallet()}>Disconnect Wallet</a>
              <p style={{ marginLeft: 8, marginRight: 8, color: 'grey' }}>|</p>
              <p>
                {address.slice(0, 6).concat('...').concat(address.slice(-4))}
              </p>
            </>
          ) : (
            <a onClick={() => connectWithMetamask()}>Connect Wallet</a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="">
        {/* Top Section */}
        <h1>PVUL IS HERE</h1>
        <p>
          Signature-based minting with{' '}
          <b>
            {' '}
            <a
              href="https://thirdweb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              thirdweb
            </a>
          </b>{' '}
          + Next.JS to create a community-made NFT collection with restrictions.
        </p>

        <p>
          Hint: We only give out signatures if your NFT name is a cool{' '}
          <b>animal name</b>! 😉
        </p>

        <hr />

        {/* <MintYourNft /> */}

        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <a key={product.id} href={product.href} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr />

        <div>
          <h2>Other NFTs in this collection:</h2>

          {loadingNfts ? (
            <p>Loading...</p>
          ) : (
            <div>
              {nfts?.map((nft) => (
                <div key={nft.metadata.id.toString()}>
                  <div>
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      style={{
                        height: 90,
                        borderRadius: 16,
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p>Named</p>
                    <p>
                      <b>{nft.metadata.name}</b>
                    </p>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <p>Owned by</p>
                    <p>
                      <b>
                        {nft.owner
                          .slice(0, 6)
                          .concat('...')
                          .concat(nft.owner.slice(-4))}
                      </b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
