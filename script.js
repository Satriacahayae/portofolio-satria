document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     REVEAL ANIMATION
  ========================== */

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });

  /* =========================
     SKILL PROGRESS
  ========================== */

  const skillCards = document.querySelectorAll(".skill");

  skillCards.forEach(function (skill) {
    skill.addEventListener("mouseenter", function () {
      // Kalau sudah pernah dibuka, jangan ulang animasi
      if (skill.classList.contains("skill-loaded")) {
        return;
      }

      const level = skill.getAttribute("data-level");
      const bar = skill.querySelector(".skill-bar-fill");

      if (!level || !bar) {
        return;
      }

      // Tampilkan progress
      skill.classList.add("skill-loaded");

      // Animasi progress dari 0 sampai level
      setTimeout(function () {
        bar.style.width = level + "%";
      }, 100);
    });
  });

  /* =========================
     VENDING MACHINE
     COMPONENTS
  ========================== */

  const components = [
    {
      file: "Arduino Uno R3.png",
      title: "Arduino Uno R3",
    },

    {
      file: "breadboard.jpg",
      title: "Breadboard",
    },

    {
      file: "coin acceptor.jpg",
      title: "Coin Acceptor",
    },

    {
      file: "kabel-jumper-female-to-male.jpg",
      title: "Kabel Jumper Female to Male",
    },

    {
      file: "Kabel-jumper-male-to-female.jpg",
      title: "Kabel Jumper Male to Female",
    },

    {
      file: "kabel-jumper-male-to-male.jpg",
      title: "Kabel Jumper Male to Male",
    },

    {
      file: "LCD .jpg",
      title: "LCD I2C",
    },

    {
      file: "male-female-jumpers.png",
      title: "Male Female Jumpers",
    },

    {
      file: "Micro-Servo-9g-SG90-1.jpg",
      title: "Micro Servo 9g SG90",
    },

    {
      file: "power suply.jpg",
      title: "Power Supply",
    },

    {
      file: "push buton.jpg",
      title: "Push Button",
    },

    {
      file: "step-down.jpg",
      title: "Step Down LM2596",
    },
  ];

  /* =========================
     VENDING MACHINE
     CIRCUIT
  ========================== */

  const circuits = [
    {
      file: "arduinocoin.png",
      title: "Rangkaian Arduino dengan Coin Acceptor",
    },

    {
      file: "arduinolcd.png",
      title: "Rangkaian Arduino dengan LCD",
    },

    {
      file: "arduinopowersuply.png",
      title: "Rangkaian Arduino dengan Power Supply",
    },

    {
      file: "arduinopushbotton.png",
      title: "Rangkaian Arduino dengan Push Button",
    },

    {
      file: "rangkaianarduino.jpeg",
      title: "Rangkaian Arduino",
    },

    {
      file: "rangkaianbreadboard.jpeg",
      title: "Rangkaian Breadboard",
    },

    {
      file: "rangkaiancoin.jpeg",
      title: "Rangkaian Coin Acceptor",
    },

    {
      file: "rangkaianlcd.jpeg",
      title: "Rangkaian LCD",
    },

    {
      file: "rangkaianpowersuply.jpeg",
      title: "Rangkaian Power Supply",
    },

    {
      file: "rangkaianpowersuply.jpeg",
      title: "Rangkaian Power Supply",
    },

    {
      file: "rangkaianservo.jpeg",
      title: "Rangkaian Servo",
    },
  ];
  /* =========================
   VENDING MACHINE
   ARDUINO IDE CODE
========================== */

  const codeImages = [
    {
      file: "coding1.png",
      title: "Arduino IDE - Source Code 1",
    },

    {
      file: "coding2.png",
      title: "Arduino IDE - Source Code 2",
    },

    {
      file: "coding3.png",
      title: "Arduino IDE - Source Code 3",
    },

    {
      file: "coding4.png",
      title: "Arduino IDE - Source Code 4",
    },
  ];

  /* =========================
     GABUNG SEMUA FOTO
  ========================== */

  const allImages = [...components, ...circuits, ...codeImages];

  let currentImage = 0;

  /* =========================
     BUAT GALLERY
  ========================== */

  function createGallery(data, containerId, startIndex) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    data.forEach(function (item, index) {
      const realIndex = startIndex + index;

      const photo = document.createElement("div");

      photo.className = "vending-photo";

      photo.innerHTML = `
        <img
          src="./Assets/${item.file}"
          alt="${item.title}"
          loading="lazy"
        >

        <div class="vending-photo-info">
          ${item.title}
        </div>
      `;

      photo.addEventListener("click", function () {
        openImageViewer(realIndex);
      });

      container.appendChild(photo);
    });
  }

  /* =========================
     TAMPILKAN KOMPONEN
  ========================== */

  createGallery(components, "componentGallery", 0);

  createGallery(circuits, "circuitGallery", components.length);

  createGallery(codeImages, "codeGallery", components.length + circuits.length);

  /* =========================
     TAMPILKAN RANGKAIAN
  ========================== */

  createGallery(circuits, "circuitGallery", components.length);

  /* =========================
     OPEN VENDING MODAL
  ========================== */

  window.openVending = function (event) {
    event.preventDefault();

    const modal = document.getElementById("vendingModal");

    if (!modal) {
      return;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
  };

  /* =========================
     CLOSE VENDING MODAL
  ========================== */

  window.closeVending = function () {
    const modal = document.getElementById("vendingModal");

    if (!modal) {
      return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";
  };

  /* =========================
     OPEN IMAGE VIEWER
  ========================== */

  function openImageViewer(index) {
    currentImage = index;

    updateImageViewer();

    const viewer = document.getElementById("imageViewer");

    if (!viewer) {
      return;
    }

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";
  }

  /* =========================
     CLOSE IMAGE VIEWER
  ========================== */

  window.closeImageViewer = function () {
    const viewer = document.getElementById("imageViewer");

    if (!viewer) {
      return;
    }

    viewer.classList.remove("active");

    const modal = document.getElementById("vendingModal");

    if (modal && modal.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  /* =========================
     UPDATE IMAGE
  ========================== */

  function updateImageViewer() {
    const image = document.getElementById("viewerImage");

    const title = document.getElementById("viewerTitle");

    const counter = document.getElementById("viewerCounter");

    if (!image || !title || !counter) {
      return;
    }

    const item = allImages[currentImage];

    if (!item) {
      return;
    }

    image.src = "./Assets/" + item.file;

    image.alt = item.title;

    title.textContent = item.title;

    counter.textContent = `${currentImage + 1} / ${allImages.length}`;
  }

  /* =========================
     NEXT IMAGE
  ========================== */

  window.nextImage = function () {
    currentImage++;

    if (currentImage >= allImages.length) {
      currentImage = 0;
    }

    updateImageViewer();
  };

  /* =========================
     PREVIOUS IMAGE
  ========================== */

  window.previousImage = function () {
    currentImage--;

    if (currentImage < 0) {
      currentImage = allImages.length - 1;
    }

    updateImageViewer();
  };

  /* =========================
     CLICK OUTSIDE MODAL
  ========================== */

  const vendingModal = document.getElementById("vendingModal");

  if (vendingModal) {
    vendingModal.addEventListener("click", function (event) {
      if (event.target === vendingModal) {
        closeVending();
      }
    });
  }

  /* =========================
     CLICK OUTSIDE IMAGE
  ========================== */

  const imageViewer = document.getElementById("imageViewer");

  if (imageViewer) {
    imageViewer.addEventListener("click", function (event) {
      if (event.target === imageViewer) {
        closeImageViewer();
      }
    });
  }

  /* =========================
     KEYBOARD
  ========================== */

  document.addEventListener("keydown", function (event) {
    const viewer = document.getElementById("imageViewer");

    const modal = document.getElementById("vendingModal");

    /* ESC */

    if (event.key === "Escape") {
      if (viewer && viewer.classList.contains("active")) {
        closeImageViewer();
      } else if (modal && modal.classList.contains("active")) {
        closeVending();
      }
    }

    /* ARROW RIGHT */

    if (event.key === "ArrowRight" && viewer && viewer.classList.contains("active")) {
      nextImage();
    }

    /* ARROW LEFT */

    if (event.key === "ArrowLeft" && viewer && viewer.classList.contains("active")) {
      previousImage();
    }
  });
});

/* =========================
   EDIT ALERT
========================= */

function editAlert(event) {
  event.preventDefault();

  alert("Edit href pada bagian project lalu masukkan link GitHub / demo kamu.");
}
