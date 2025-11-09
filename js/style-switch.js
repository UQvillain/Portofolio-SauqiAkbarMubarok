document.addEventListener("DOMContentLoaded", () => {
  // Jalankan hanya setelah semua elemen (termasuk .style-switch) sudah ada
  const initStyleSwitch = () => {
    const styleSwitch = document.querySelector(".style-switch");
    const styleSwitchToggle = document.querySelector(".style-switch-toggler");
    const dayNight = document.querySelector(".day-night");
    const alternateStyles = document.querySelectorAll(".alternative-style");

    // Jika elemen belum ada, tunggu sebentar dan coba lagi
    if (!styleSwitch || !styleSwitchToggle || !dayNight || alternateStyles.length === 0) {
      setTimeout(initStyleSwitch, 100);
      return;
    }

    // Toggle style switch panel
    styleSwitchToggle.addEventListener("click", () => {
      styleSwitch.classList.toggle("open");
    });

    // Tutup panel saat scroll
    window.addEventListener("scroll", () => {
      if (styleSwitch.classList.contains("open")) {
        styleSwitch.classList.remove("open");
      }
    });

    // Fungsi ubah tema warna
    window.setActiveStyle = function (color) {
      alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
          style.removeAttribute("disabled");
        } else {
          style.setAttribute("disabled", "true");
        }
      });
    };

    // Mode light/dark
    dayNight.addEventListener("click", () => {
      const icon = dayNight.querySelector("i");
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
      document.body.classList.toggle("dark");
    });

    // Set ikon awal
    window.addEventListener("load", () => {
      const icon = dayNight.querySelector("i");
      if (document.body.classList.contains("dark")) {
        icon.classList.add("fa-moon");
      } else {
        icon.classList.add("fa-sun");
      }
    });
  };

  initStyleSwitch();
});
