
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("header");
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const tabs = document.querySelectorAll('.tab');
    const testimonialContent = document.getElementById('testimonial-content');

    const testimonials = {
      1: {
        text: '"This service helped me grow my business tremendously!"',
        author: '- Moise'
      },
      2: {
        text: '"A truly professional team delivering quality work on time."',
        author: '- Nepo'
      },
      3: {
        text: '"Exceptional support and attention to detail throughout."',
        author: '- Tutu'
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Update testimonial content
        const tabId = tab.getAttribute('data-tab');
        testimonialContent.querySelector('.testimonial-text').textContent = testimonials[tabId].text;
        testimonialContent.querySelector('.testimonial-author').textContent = testimonials[tabId].author;
      });
    });