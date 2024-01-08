// Menu.
    var menu = document.getElementById('menu');
    var menuOpeners = menu.querySelector('ul').getElementsByClassName('opener');

    // Openers.
    Array.from(menuOpeners).forEach(function(opener) {
        opener.addEventListener('click', function(event) {

            event.preventDefault();

            Array.from(menuOpeners).forEach(function(otherOpener) {
                if (otherOpener !== opener) {
                    otherOpener.classList.remove('active');
                }
            });
            opener.classList.toggle('active');

            // Trigger resize (sidebar lock).
            window.dispatchEvent(new Event('resize.sidebar-lock'));

        });
    });


export default menu;
