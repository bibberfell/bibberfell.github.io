//animations
function activateAnimation(selector) {
	var items, classes = '';
	if(typeof selector === 'string') {
		items = document.querySelectorAll(selector);
	} else {
		items = selector;
	}
	if(items.length) {
		for (var i = items.length - 1; i >= 0; i--) {
			classes = items[i].classList;
			if(classes.toString().indexOf('_active') < 0) {
				for (var j = classes.length - 1; j >= 0; j--) {
					items[i].classList.add(classes[j] + '_active');
				}
			} else {
				for (var j = classes.length - 1; j >= 0; j--) {
					items[i].classList.remove(classes[j] + '_active');
				}
			}
		}
	}
}

var cameraPosition, elementPosition;
function checkInCamera(element, callback) {
    if (!element) 
        return false;

    cameraPosition = parseInt(window.innerHeight / 1.5);
    elementPosition = parseInt(element.getBoundingClientRect().top);

    if (elementPosition <= cameraPosition && element.dataset.checked !== "true") {
        element.dataset.checked = "true";
        callback(element);
    }
}

function setTimer(argument, queue, time, func) {
	setTimeout(function() {
		func.call('', argument);
	}, queue*time);
}
