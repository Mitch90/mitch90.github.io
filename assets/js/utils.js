var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function initDrag(el, parent) {
    // Store the object of the element which needs to be moved
    selected = el;
    let $el = $(el); 
    let rotation = $el.attr('style').replace(/.*(rotate\(.*deg\)).*/,'$1');
    $el.css('transform', `${rotation} scale(1.05)`);
    el.classList.add('card--moving');
    $el.appendTo(parent);
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
    
}

// Will be called when user dragging an element
function dragElement(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function emptySelection() {
    if (selected != null) {
        let $el = $(selected); 
        let rotation = $el.attr('style').replace(/.*(rotate\(.*deg\)).*/,'$1');
        $el.css('transform', `${rotation} scale(1)`);
        selected.classList.remove('card--moving');
    }
    selected = null;
}