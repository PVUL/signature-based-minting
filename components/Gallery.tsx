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

  // gets random integer between min and max, inclusive
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    // const acceptableNumbers = [
    //   32, 28, 24, 20, 16, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
    // ];

    const random = Math.floor(Math.random() * (max - min + 1) + min);

    // for (let i = random; i >= 0; i--) {
    //   if (acceptableNumbers.includes(i)) return i;
    // }
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className="h-screen text-xl bg-blue-300">collection name</div>

      <div className="max-w-6xl px-4 py-16 mx-auto sm:py-24 sm:px-6">
        <div className="grid grid-cols-1 px-10 pt-40 sm:grid-cols-1 gap-x-6 lg:grid-cols-1 xl:grid-cols-3 xl:gap-x-6 gap-y-32">
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
