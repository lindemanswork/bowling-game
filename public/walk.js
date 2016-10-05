function getTransformProperty(element) {
	console.log(element.className);
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
	//console.log("translating image!: "+ trans.toString() +"px, property: "+property);
    sprite.style[property] = 'translateX(' + trans + 'px)';
}

function walk(sprite, trans, property) {
    translate(sprite, trans, property);
    sprite.classList.remove('left');
    sprite.classList.add('right');
    sprite.classList.add('walk-right');
}

function stop(sprite) {
    sprite.classList.remove('walk-right');
}

document.addEventListener('keydown', walk, false);
document.addEventListener('keyup', stop, false);
