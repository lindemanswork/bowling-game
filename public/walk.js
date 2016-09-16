function getTransformProperty(element) {
    var properties = [
        'transform',
        'WebkitTransform',
        'msTransform',
        'MozTransform',
        'OTransform'
    ];
    var p;
    while (p = properties.shift()) {
        if (typeof element.style[p] != 'undefined') {
            return p;
        }
    }
    return false;
}

function translate(sprite, trans, property) {
    sprite.style[property] = 'translateX(' + trans + 'px)';
}

function walk(sprite, trans, property) {
    /*
    var keyCode = e.keyCode;
    if (keyCode === 39) {
        key.right = true;
    } else if (keyCode === 37) {
        key.left = true;
    }
    if (key.right === true) {
    	*/
    trans += 10;
    translate(sprite, trans, property);
    sprite.classList.remove('left');
    sprite.classList.add('right');
    sprite.classList.add('walk-right');
    /*
    } else if (key.left === true) {
        trans -= 10;
        translate();
        sprite.classList.remove('right');
        sprite.classList.add('left');
        sprite.classList.add('walk-left');
    }
    */
}

function stop(sprite) {
    /*
    var keyCode = e.keyCode;
    if (keyCode === 39) {
        key.right = false;
    } else if (keyCode === 37) {
        key.left = false;
    }
    if (key.right === false) {
    	*/
    sprite.classList.remove('walk-right');
    /*
    }
    if (key.left === false) {
        sprite.classList.remove('walk-left');
    }
    */
}

document.addEventListener('keydown', walk, false);
document.addEventListener('keyup', stop, false);
