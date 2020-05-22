'use strict';

(function () {
    const options = { root: null, threshold: [0, 0.75] };
    let callback = function (entries, observer) {
        entries.forEach(entry => {
            // console.log(entry.isIntersecting, entry.intersectionRatio);

            if (entry.isIntersecting) {
                $navTitle.classList.remove('title--shown');
            } else {
                if (counter > 0) {
                    $navTitle.classList.add('title--shown');
                }
            }
            counter++;
        });
    };

    const observer = new IntersectionObserver(callback, options);
    const $target = document.querySelector('.header__container h2');
    const $navTitle = document.querySelector('nav h5');
    let counter = 0;

    observer.observe($target);

})();