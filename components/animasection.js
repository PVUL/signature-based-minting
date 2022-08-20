// https://stuartcusack.ie/blog/tailwind-classes-scroll-animations

// With a lot of help from:
// https://webdesign.tutsplus.com/tutorials/how-to-intersection-observer--cms-30250

class Animasection {
  constructor(options = {}) {
    // A nice way to initialise default options
    this.options = Object.assign(
      this,
      {
        root: null, // relative to document viewport
        rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
        threshold: 0.5, // visible amount of item shown in relation to root (higher values can cause problems)
      },
      options
    );

    // This is the guy who will tell us when an element intersects with the viewport
    this.observer = new IntersectionObserver(this.onChange, this.options);
  }

  /**
   * Observe all elements that contain either data-class-in or data-class-out
   */
  observeAll() {
    let images = document.querySelectorAll('[data-class-in], [data-class-out]');
    images.forEach((img) => this.observer.observe(img));
  }

  /**
   * Unobserve all elements that contain either data-class-in or data-class-out
   * Useful for optimisation / page transitions with swup / turbolinks
   */
  unobserveAll() {
    let images = document.querySelectorAll('[data-class-in], [data-class-out]');
    images.forEach((img) => this.observer.unobserve(img));
  }

  /**
   * The intersection observer will fire this function
   * when at least one of our elements intersects / leaves the viewport
   */
  onChange(changes, observer) {
    changes.forEach((change) => {
      if (change.isIntersecting) {
        /*
         * 'split' turns our data attribute string into an array, and the spread operator (three dots)
         * deconstructs it into the format that we need for manipulating the element's 'classList'
         */
        change.target.classList.remove(
          ...change.target.getAttribute('data-class-out').split(' ')
        );
        change.target.classList.add(
          ...change.target.getAttribute('data-class-in').split(' ')
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
  }
}

export default new Animasection();
