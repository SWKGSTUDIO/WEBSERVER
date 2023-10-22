document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".menu-container");
    const menuOverlay = document.querySelector(".menu-overlay");
    const iframeContainer = document.querySelector(".iframe-container iframe");

    let isMenuOpen = false;

    // Задайте начальный путь для iframe
    iframeContainer.src = "page1"; // Замените на соответствующий путь к вашей странице "page1"

    menuButton.addEventListener("click", () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay.addEventListener("click", () => {
        closeMenu();
    });

    menu.addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-link")) {
            e.preventDefault();
            const menuLinks = document.querySelectorAll(".menu-link");
            const index = Array.from(menuLinks).indexOf(e.target) + 1;
            const pagePath = `page${index}`;
            iframeContainer.src = pagePath;
            closeMenu();
        }
    });

    function openMenu() {
        menu.style.right = "0";
        menuOverlay.style.display = "block";
        document.body.style.overflow = "hidden";
        isMenuOpen = true;
    }

    function closeMenu() {
        menu.style.right = "-100%";
        menuOverlay.style.display = "none";
        document.body.style.overflow = "auto";
        isMenuOpen = false;
    }
});
