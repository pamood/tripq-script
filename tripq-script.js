(function () {
  const paramToPreserve = 'tripq_booking';
  const urlParams = new URLSearchParams(window.location.search);
  const tripqBooking = urlParams.get(paramToPreserve);
  console.log('TripQ Booking Parameter:', tripqBooking);
  if (!tripqBooking) return; 

  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="/"]:not([href*="?"])');
    links.forEach(link => {
      const originalHref = link.getAttribute('href');
      link.setAttribute('href', `${originalHref}?${paramToPreserve}=${encodeURIComponent(tripqBooking)}`);
    });

    const linksWithQuery = document.querySelectorAll('a[href^="/"][href*="?"]:not([href*="tripq_booking="])');
    linksWithQuery.forEach(link => {
      const originalHref = link.getAttribute('href');
      const separator = originalHref.includes('?') ? '&' : '?';
      link.setAttribute('href', `${originalHref}${separator}${paramToPreserve}=${encodeURIComponent(tripqBooking)}`);
    });
  });
})();