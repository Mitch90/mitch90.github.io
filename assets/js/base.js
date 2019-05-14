(function () {
    const $name = document.getElementById('name');
    const $surname = document.getElementById('surname');
    const colors = ['#000000', '#4469DD', '#F53D3D'];
    let lastpair = '#000000#000000';
    let resizeTimer;

    // document.ontouchstart = getRandomColors;
    document.onclick = getRandomColors;

    // make jobs move on hover
    const $int = document.getElementById('interaction');
    const $inf = document.getElementById('information');
    const $job = document.querySelector('nav h4');
    let intPosition = $int.getBoundingClientRect().left;
    let infPosition = $inf.getBoundingClientRect().left;
    $int.style.left = 0;
    $inf.style.left = 0;
    let distance = infPosition - intPosition;

    $job.onmouseenter = function () {
        $int.style.left = distance + 'px';
        $inf.style.left = -distance + 'px';
    };
    $job.onmouseleave = function () {
        $int.style.left = 0;
        $inf.style.left = 0;
    };

    function getRandomColors() {
        let randomColor1 = colors[Math.floor(Math.random() * colors.length)];
        let randomColor2 = colors[Math.floor(Math.random() * colors.length)];
        if (randomColor1 + randomColor2 != lastpair) {
            $name.style.color = randomColor1;
            $surname.style.color = randomColor2;
            lastpair = randomColor1 + randomColor2;
        } else {
            getRandomColors();
        }
    };

})();