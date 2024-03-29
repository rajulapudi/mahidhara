/**
 * Template Name: Mahidhara - v2.2.0
 * Template URL: https://bootstrapmade.com/Mahidhara-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 1;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 50,
          density: { enable: true, value_area: 800 },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 6 },
          image: { src: "img/github.svg", width: 100, height: 400 },
        },
        opacity: {
          value: 0.4,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 1,
          random: true,
          anim: { enable: false, speed: 20, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: { opacity: 1 },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
    var count_particles, stats, update;
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    count_particles = document.querySelector(".js-count-particles");
    update = function () {
      stats.begin();
      stats.end();
      if (
        window.pJSDom[0].pJS.particles &&
        window.pJSDom[0].pJS.particles.array
      ) {
        count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);

    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, #mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass("active");
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");

  heroCarousel.on("slid.bs.carousel", function (e) {
    $(this).find("h2").addClass("animate_animated animate_fadeInDown");
    $(this)
      .find("p, .btn-get-started")
      .addClass("animate_animated animate_fadeInUp");
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

// GET QUOTE Form validation code

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();


// Code for GET QUOTE form Submission
const formSubmit = document.getElementById("formSubmit");

if (formSubmit) {
  formSubmit.addEventListener("submit", function createForm(event) {
    event.preventDefault();
    const name = document.getElementById("validationCustom01").value;
    const email = document.getElementById("validationCustom02").value;
    const product = document.getElementById("validationCustom03").value;
    const qty = document.getElementById("validationCustom04").value;
    const address = document.getElementById("validationCustom05").value;
    const phone = document.getElementById("validationCustom06").value;
    const msg = document.getElementById("validationCustom07").value;
    const companyName = document.getElementById("validationCustom08").value;

    const data = {
      data: {
        name,
        email,
        product,
        qty,
        address,
        phone,
        msg,
        companyName,
      },
    };

    console.log(data);

    fetch("https://content.techpranee.com/api/leads-mahidharas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Clear the form fields
        formSubmit.reset();
        $("#exampleModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

// Code for Contact Us form Submission

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function createForm(event) {
    event.preventDefault();
    // console.log("checking contact");
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const product = document.getElementById("productDropdown").value;
    const qty = document.getElementById("contactQuantity").value;
    const address = document.getElementById("contactAddress").value;
    const phone = document.getElementById("contactPhone").value;
    const msg = document.getElementById("contactMsg").value;
    const companyName= null;



    const data = {
      data: {
        name,
        email,
        product,
        qty,
        address,
        phone,
        msg,
        companyName,
      },
    };

    console.log(data);

    fetch("https://content.techpranee.com/api/leads-mahidharas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        contactForm.reset()
        // $('#exampleModal').modal('hide');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}



// Code for MSDS form Submission

const msdsForm = document.getElementById("msdsForm");

if (msdsForm) {
  msdsForm.addEventListener("submit", function createForm(event) {
    event.preventDefault();
    const name = document.getElementById("msdsName").value;
    const email = document.getElementById("msdsEmail").value;
    const product = document.getElementById("msdsProduct").value;
    const qty = document.getElementById("msdsQuantity").value;
    const address = document.getElementById("msdsAddress").value;
    const phone = document.getElementById("msdsPhone").value;
    const msg = document.getElementById("msdsMsg").value;
    const companyName=document.getElementById("msdsCompanyName").value;

    const data = {
      data: {
        name,
        email,
        product,
        qty,
        address,
        phone,
        msg,
        companyName,
      },
    };

    fetch("https://content.techpranee.com/api/leads-mahidharas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        msdsForm.reset()
        $("#exampleModal1").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}





// js for megamenu dropdown

let productDropdownTimer; // Timer variable to delay hiding the dropdown

function showProductDropdown() {
  const productDropdown = document.getElementsByClassName("list-container")
  productDropdown.style.display = "inline-flex"; // Show the dropdown
  clearTimeout(productDropdownTimer); // Clear the timer (if any)
}

function hideProductDropdown() {
  // Delay hiding the dropdown for 2 seconds
  productDropdownTimer = setTimeout(() => {
    const productDropdown = document.getElementById("product-dropdown");
    productDropdown.style.display = "none"; // Hide the dropdown
  }, 2000); // 2 seconds (2000 milliseconds)
}



// code for enquiry button.

const enquiryBtn = document.getElementById("enquiry-btn")

function openModal() {
  $("#exampleModal").modal('show');
}
// Add click event listeners to both buttons
enquiryBtn.addEventListener('click', openModal);



// to keep detalis tag close in mabile navbaar 
document.addEventListener("DOMContentLoaded", function() {
  const detailsElement = document.querySelector('details');

  function updateDetailsState() {
    // Check the screen width and set the open attribute accordingly
    detailsElement.open = window.innerWidth > 1366;
  }

  // Initial update
  updateDetailsState();

  // Update on window resize
  window.addEventListener('resize', updateDetailsState);
});


// for whatsaap massege
function openWhatsApp() {
  window.open('https://wa.me/9848389154?&text=Hello team Mahidhara, I am interested in your products.', '_blank'); 
}
