document.addEventListener("DOMContentLoaded", function () {
    let ratingCategories = ["service", "food", "ambience", "atmosphere"];

    // Initialize rating stars for each category
    ratingCategories.forEach(category => {
        let ratingDiv = document.querySelector(`.rating[data-category='${category}']`);
        for (let i = 1; i <= 5; i++) {
            let star = document.createElement("span");
            star.classList.add("star");
            star.setAttribute("data-value", i);
            star.innerHTML = "★";
            star.addEventListener("click", function () {
                setRating(category, i);
            });
            ratingDiv.appendChild(star);
        }
    });

    function setRating(category, value) {
        let stars = document.querySelectorAll(`.rating[data-category='${category}'] .star`);
        let ratingInput = document.getElementById(`${category}-rating`);
        ratingInput.value = value;

        stars.forEach(star => {
            star.classList.remove("selected");
            if (parseInt(star.getAttribute("data-value")) <= value) {
                star.classList.add("selected");
            }
        });
    }

    document.getElementById("reviewForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let review = document.getElementById("review").value;

        let serviceRating = document.getElementById("service-rating").value;
        let foodRating = document.getElementById("food-rating").value;
        let ambienceRating = document.getElementById("ambience-rating").value;
        let atmosphereRating = document.getElementById("atmosphere-rating").value;

        if (name && review && serviceRating > 0 && foodRating > 0 && ambienceRating > 0 && atmosphereRating > 0) {
            let reviewContainer = document.getElementById("reviews");
            let reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `
                <strong>${name}</strong> 
                <p>${review}</p>
                <p>⭐ Service: ${"★".repeat(serviceRating)}</p>
                <p>⭐ Food: ${"★".repeat(foodRating)}</p>
                <p>⭐ Ambience: ${"★".repeat(ambienceRating)}</p>
                <p>⭐ Atmosphere: ${"★".repeat(atmosphereRating)}</p>
            `;

            reviewContainer.appendChild(reviewElement);

            document.getElementById("reviewForm").reset();
            ratingCategories.forEach(category => {
                setRating(category, 0);
            });
        } else {
            alert("Please fill out all fields and select ratings for all categories.");
        }
    });
});
