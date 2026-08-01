// Function to handle switching pages
function showPage(pageId) {
  const pages = document.querySelectorAll('.app-page');
  pages.forEach(page => {
    page.classList.remove('active-page');
    page.classList.add('hidden-page');
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.remove('hidden-page');
    selectedPage.classList.add('active-page');
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation Event Listeners
  const eventCard = document.getElementById('eventCard');
  if (eventCard) {
    eventCard.addEventListener('click', () => showPage('ticketsPage'));
  }

  const closeTicketsBtn = document.getElementById('closeTicketsBtn');
  if (closeTicketsBtn) {
    closeTicketsBtn.addEventListener('click', () => showPage('eventsPage'));
  }

  const viewTicketBtns = document.querySelectorAll('.view-ticket-btn');
  viewTicketBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const seatNum = btn.getAttribute('data-seat') || '3';
      const activeSeatElem = document.getElementById('activeSeatNum');
      if (activeSeatElem) {
        activeSeatElem.textContent = seatNum;
      }
      showPage('barcodePage');
    });
  });

  const closeBarcodeBtn = document.getElementById('closeBarcodeBtn');
  if (closeBarcodeBtn) {
    closeBarcodeBtn.addEventListener('click', () => showPage('ticketsPage'));
  }

  // 2. Carousel Dots & Slider Synchronization
  const slider = document.getElementById('ticketsSlider');
  const dots = document.querySelectorAll('#carouselDots .dot');

  if (slider && dots.length > 0) {
    // Click dot -> Scroll to target ticket slide
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const slideWidth = slider.clientWidth;
        slider.scrollTo({
          left: slideWidth * index,
          behavior: 'smooth'
        });
      });
    });

    // Swipe/scroll -> Update active dot indicator automatically
    slider.addEventListener('scroll', () => {
      const slideWidth = slider.clientWidth;
      if (slideWidth > 0) {
        const activeIndex = Math.round(slider.scrollLeft / slideWidth);
        dots.forEach((dot, i) => {
          if (i === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }

});