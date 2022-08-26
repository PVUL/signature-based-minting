import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Nft } from '../types';
import Animasection from './animasection';
import classNames from 'classnames';
import { useScrollDirection } from '../utils/useScrollDirection';

interface Props {
  collection: Nft[];
  className?: string;
}

const options = {
  root: null, // relative to document viewport
  rootMargin: '200px', // margin around root. Values are similar to css property. Unitless values not allowed
  threshold: 0.2, // visible amount of item shown in relation to root (higher values can cause problems)
};

export const Gallery = ({ collection, className }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollDirection = useScrollDirection();

  const items = [
    { id: 1, color: '#F45D4C' },
    { id: 2, color: '#A1DBB2' },
    { id: 3, color: '#FACA66' },
  ];

  const onChange = useCallback((changes, _observer) => {
    changes.forEach((change) => {
      // isIntersecting means it is visible in the window (and considering rootMargin)
      setIsVisible(change.isIntersecting);

      if (change.isIntersecting) {
        /*
         * 'split' turns our data attribute string into an array, and the spread operator (three dots)
         * deconstructs it into the format that we need for manipulating the element's 'classList'
         */

        change.target.classList.remove(
          ...change.target.getAttribute('data-class-out').split(' ')
        );
        change.target.classList.add(
          ...change.target.getAttribute(`data-class-in`).split(' ')
        );
      } else {
        change.target.classList.remove(
          ...change.target.getAttribute('data-class-in').split(' ')
        );
        change.target.classList.add(
          ...change.target.getAttribute('data-class-out').split(' ')
        );
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(onChange, options);
    let images = document.querySelectorAll('[data-class-in], [data-class-out]');
    images.forEach((img) => observer.observe(img));

    return () => images.forEach((img) => observer.unobserve(img));
  }, [onChange]);

  return (
    <div className={`bg-white overflow-hidden ${className}`}>
      <div className="h-screen py-20 bg-blue-300">
        <h1 className="text-4xl">collection name</h1>
        <p className="pt-8">
          description for this gallery, it's a dope gallery
        </p>
        <div className="flex items-stretch pl-1 mt-32 overflow-hidden transition ease-out scale-125 h-80">
          <div className="w-32 h-96 bg-[#F45D4C] flex-auto hover:w-80 hover:ease-in duration-500 rotate-12 scale-125">
            test
          </div>
          <div className="w-32 flex-auto h-96 bg-[#A1DBB2] hover:w-80 hover:ease-in duration-500 rotate-12 scale-125">
            test
          </div>
          <div className="w-24 flex-auto h-96 bg-[#FACA66] hover:w-80 hover:ease-in duration-500 rotate-12 scale-125">
            test
          </div>
        </div>
        <div className="flex items-stretch pl-1 mt-20 overflow-hidden transition ease-out scale-125 h-80">
          <div className="w-32 h-96 bg-[#F7A541] flex-auto hover:w-80 hover:ease-in duration-500 rotate-12 scale-125">
            test
          </div>
          <div className="w-32 flex-auto h-96 bg-[#54787D] hover:w-80 hover:ease-in duration-500 rotate-12 scale-125">
            test
          </div>
          <div className="w-24 flex-auto h-96 bg-[#5B527F] hover:w-80 hover:ease-in duration-500 rotate-12 scale-125">
            test
          </div>
        </div>
      </div>

      <div className="w-screen py-16 mx-auto spx-4 sm:py-24 sm:px-6 sm:w-auto">
        <div className="grid grid-cols-1 px-10 pt-40 sm:grid-cols-1 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 sm:gap-y-32 gap-y-16">
          {collection.map((nft) => (
            <a
              key={nft.id}
              href={'/'}
              className={classNames(
                'transition duration-1000 opacity-5 transform',
                {
                  'duration-[1300ms]': nft.id % 3 === 1,
                  'duration-[1600ms]': nft.id % 3 === 2,
                }
              )}
              data-class-in={`opacity-100 -translate-y-40`}
              data-class-out={'opacity-5'}
            >
              <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1">
                <Image
                  src={nft.url}
                  alt={nft.name}
                  layout="fill"
                  className="object-cover object-center w-full h-full group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{nft.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {nft.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
