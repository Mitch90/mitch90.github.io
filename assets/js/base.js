(function () {
    const $name = document.getElementById('name');
    const $surname = document.getElementById('surname');

    // make jobs move on hover
    const $int = document.getElementById('interaction');
    const $inf = document.getElementById('information');
    const $job = document.querySelector('nav h4');
    const intPosition = $int.getBoundingClientRect().left;
    const infPosition = $inf.getBoundingClientRect().left;
    $int.style.left = 0;
    $inf.style.left = 0;
    const distance = infPosition - intPosition;

    $job.onmouseenter = function () {
        $int.style.left = distance + 'px';
        $inf.style.left = -distance + 'px';

    };
    $job.onmouseleave = function () {
        $int.style.left = 0;
        $inf.style.left = 0;
    };
})();