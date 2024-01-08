// Sidebar.
const sidebar = document.getElementById('sidebar');
const sidebarInner = sidebar.querySelector('.inner');

// Toggle.
const toggleLink = document.createElement('a');
toggleLink.href = '#sidebar';
toggleLink.classList.add('toggle');
toggleLink.textContent = 'Toggle';
sidebar.appendChild(toggleLink);

toggleLink.addEventListener('click', function (event) {
  // Prevent default.
  event.preventDefault();
  event.stopPropagation();

  // Toggle.
  sidebar.classList.toggle('inactive');
});

// Events.

// Link clicks.
sidebar.addEventListener('click', function (event) {
  const target = event.target;

  // Check if the clicked element is an anchor tag.
  if (target.tagName === 'A') {
    // Vars.
    const href = target.getAttribute('href');
    const targetAttribute = target.getAttribute('target');

    // Prevent default.
    event.preventDefault();
    event.stopPropagation();

    // Check URL.
    if (!href || href === '#' || href === '') {
      return;
    }

    // Hide sidebar.
    sidebar.classList.add('inactive');

    // Redirect to href.
    setTimeout(function () {
      if (targetAttribute === '_blank') {
        window.open(href);
      } else {
        window.location.href = href;
      }
    }, 500);
  }
});

// Prevent certain events inside the panel from bubbling.
sidebar.addEventListener('click', function (event) {
  // Prevent propagation.
  event.stopPropagation();
});

// Hide panel on body click/tap.
document.body.addEventListener('click', function (event) {
  // Deactivate.
  sidebar.classList.add('inactive');
});

export default sidebar;
