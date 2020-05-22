'use strict';

export let selected = null;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Will be called when user starts dragging an element
export function initDrag(e, el, parent) {
    // Store the object of the element which needs to be moved
    selected = { el: el, parent: parent };
    if (parent === 'home') {
        let parentEl = document.getElementById(parent);
        let rotation = el.getAttribute('style').replace(/.*(rotate\(.*deg\)).*/, '$1');
        el.style.transform = `${rotation} scale(1.05)`;
        parentEl.appendChild(el);
        if (e.type === "touchstart") {
            let order = el.getAttribute('data-order');
            let $project = document.querySelector(`.projects__list a[data-order='${order}']`);
            $project.classList.add('card--match');
        }
    }
    el.classList.add('card--moving');
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset - selected.el.offsetLeft;
        initialY = e.touches[0].clientY - yOffset - selected.el.offsetTop;
    } else {
        initialX = e.clientX - xOffset - selected.el.offsetLeft;
        initialY = e.clientY - yOffset - selected.el.offsetTop;
    }
}

// Will be called when user dragging an element
export function dragElement(e) {
    if (selected !== null) {
        e.preventDefault();
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        xOffset = 0;
        yOffset = 0;
        selected.el.style.left = currentX + 'px';
        selected.el.style.top = currentY + 'px';
    }
}

// Destroy the object when we are done
export function emptySelection(e) {
    if (selected !== null) {
        if (selected.parent === 'home') {
            let rotation = selected.el.getAttribute('style').replace(/.*(rotate\(.*deg\)).*/, '$1');
            selected.el.style.transform = `${rotation} scale(1)`;
            if (e.type === "touchend") {
                let order = selected.el.getAttribute('data-order');
                let $project = document.querySelector(`.projects__list a[data-order='${order}']`);
                $project.classList.remove('card--match');
            }
        }
        selected.el.classList.remove('card--moving');
    }
    initialX = currentX;
    initialY = currentY;
    selected = null;
}