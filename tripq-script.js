(function () {
  const paramToPreserve = 'tripq_booking';
  
  function updateLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const tripqBooking = urlParams.get(paramToPreserve);
    console.log('TripQ Booking Parameter:', tripqBooking);
    
    if (!tripqBooking) return;
    
    const links = document.querySelectorAll('a[href^="/"]:not([href*="' + paramToPreserve + '="])');
    links.forEach(link => {
      const originalHref = link.getAttribute('href');
      const separator = originalHref.includes('?') ? '&' : '?';
      link.setAttribute('href', originalHref + separator + paramToPreserve + '=' + encodeURIComponent(tripqBooking));
    });
  }
  
  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateLinks);
  } else {
    updateLinks();
  }
  
  // Handle Next.js navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(updateLinks, 100);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(updateLinks, 100);
  };
  
  window.addEventListener('popstate', function() {
    setTimeout(updateLinks, 100);
  });
  
  // Run periodically to catch any new links
  setInterval(updateLinks, 2000);
})();