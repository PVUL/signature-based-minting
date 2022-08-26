import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';

export const Login = () => {
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const connectWithMetamask = useMetamask();

  return (
    <>
      {address && (
        <p className="bg-black">
          {address.slice(0, 6).concat('...').concat(address.slice(-4))}
        </p>
      )}
      <div className="hover:cursor-pointer">
        {address ? (
          <a onClick={() => disconnectWallet()}>Sign out</a>
        ) : (
          <a onClick={() => connectWithMetamask()}>Sign in</a>
        )}
      </div>
    </>
  );
};
