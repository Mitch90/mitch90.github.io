(function () {
    const $interests = document.querySelector('.interests');
    const $interestsCard = document.querySelector('.card__interests');
    const $plans = document.querySelector('.plans');
    const $plansCard = document.querySelector('.card__plans');
    const $cards = $('.about__card');
    let resizeTimer;

    calculateMask($interests, $interestsCard);
    calculateMask($plans, $plansCard);

    $cards.on("touchstart mousedown", function (ev) {
        ev.preventDefault();
        initDrag(ev, ev.currentTarget, "about");
    })

    document.ontouchmove = function (ev) {
        dragElement(ev);
        if (selected !== null) {
            if (selected.el.id == 'interests') {
                calculateMask($interests, $interestsCard);
            } else {
                calculateMask($plans, $plansCard);
            }
        }
    };
    document.ontouchend = emptySelection;
    
    document.onmousemove = function (ev) {
        dragElement(ev);
        if (selected !== null) {
            if (selected.el.id == 'interests') {
                calculateMask($interests, $interestsCard);
            } else {
                calculateMask($plans, $plansCard);
            }
        }
    };
    document.onmouseup = emptySelection;

    // Credits to Chris Coyier https://css-tricks.com/snippets/jquery/done-resizing-event/ 
    window.onresize = function (e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $interests = document.querySelector('.interests');
            $interestsCard = document.querySelector('.card__interests');
            $plans = document.querySelector('.plans');
            $plansCard = document.querySelector('.card__plans');
            calculateMask($interests, $interestsCard);
            calculateMask($plans, $plansCard);
        }, 250);
    }

})();

function calculateMask($annotations, $card) {
    const annotationsDimensions = $annotations.getBoundingClientRect();
    const cardDimensions = $card.getBoundingClientRect();
    // console.log(annotationsDimensions, cardDimensions);
    const cardHorizontalLenght = $card.id == "interests" ? annotationsDimensions.height : annotationsDimensions.height / 2;
    const cardVerticalLenght = annotationsDimensions.height;
    const cardHorizontalDelta = cardVerticalLenght * Math.sin(10 * Math.PI / 180);
    const cardVerticalDelta = cardHorizontalLenght * Math.sin(10 * Math.PI / 180);

    const cardX1 = cardDimensions.x + cardHorizontalDelta;
    const cardY1 = cardDimensions.y;
    const cardX2 = cardDimensions.right;
    const cardY2 = cardDimensions.y + cardVerticalDelta;
    const cardX3 = cardDimensions.right - cardHorizontalDelta;
    const cardY3 = cardDimensions.bottom;
    const cardX4 = cardDimensions.x;
    const cardY4 = cardDimensions.bottom - cardVerticalDelta;

    const maskX1 = cardX1 - annotationsDimensions.x;
    const maskY1 = cardY1 - annotationsDimensions.y;
    const maskX2 = cardX2 - annotationsDimensions.x;
    const maskY2 = cardY2 - annotationsDimensions.y;
    const maskX3 = cardX3 - annotationsDimensions.x;
    const maskY3 = cardY3 - annotationsDimensions.y;
    const maskX4 = cardX4 - annotationsDimensions.x;
    const maskY4 = cardY4 - annotationsDimensions.y;
    // console.log(annotationsDimensions.y, cardY2);

    $annotations.setAttribute("style", `clip-path:polygon(${maskX1}px ${maskY1}px, ${maskX2}px ${maskY2}px, ${maskX3}px ${maskY3}px, ${maskX4}px ${maskY4}px);`);

}