// scroll.js
function initializeSidebarLock() {
    var sidebarInner = document.getElementById('sidebar').querySelector('.inner');
    var windowScrollTop = window.scrollY;
  
    // Reset scroll position to 0 if it's 1.
    if (windowScrollTop === 1) {
      window.scrollTo(0, 0);
    }
  
    function handleScroll() {
      var x, y;
  
      // Calculate positions.
      x = Math.max(sidebarInnerHeight - windowHeight, 0);
      y = Math.max(0, window.scrollY - x);
  
      // Lock/unlock.
      if (sidebarInner.dataset.locked === '1') {
        if (y <= 0) {
          sidebarInner.dataset.locked = '0';
          sidebarInner.style.position = '';
          sidebarInner.style.top = '';
        } else {
          sidebarInner.style.top = -1 * x + 'px';
        }
      } else {
        if (y > 0) {
          sidebarInner.dataset.locked = '1';
          sidebarInner.style.position = 'fixed';
          sidebarInner.style.top = -1 * x + 'px';
        }
      }
    }
  
    function handleResize() {
      // Calculate heights.
      windowHeight = window.innerHeight;
      sidebarInnerHeight = sidebarInner.offsetHeight + 30;
  
      // Trigger scroll.
      handleScroll();
    }
  
    var windowHeight = window.innerHeight;
    var sidebarInnerHeight = sidebarInner.offsetHeight + 30;
  
    // Attach scroll and resize event listeners.
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  
    // Trigger initial resize.
    handleResize();
  }
  
  // Export the function for use in other modules.
  export { initializeSidebarLock };
  