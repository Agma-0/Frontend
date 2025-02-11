const API_URL = "http://localhost:5000/api/reviews";

async function fetchReviews() {
    let response = await fetch(API_URL);
    let reviews = await response.json();
    
    let reviewContainer = document.getElementById("reviews");
    reviewContainer.innerHTML = "";
    
    reviews.forEach(review => {
        let reviewElement = document.createElement("div");
        reviewElement.innerHTML = `
            <strong>${review.name}</strong> 
            <p>${review.review}</p>
            <p>⭐ Service: ${"★".repeat(review.service)}</p>
            <p>⭐ Food: ${"★".repeat(review.food)}</p>
            <p>⭐ Ambience: ${"★".repeat(review.ambience)}</p>
            <p>⭐ Atmosphere: ${"★".repeat(review.atmosphere)}</p>
        `;
        reviewContainer.appendChild(reviewElement);
    });
}

document.getElementById("reviewForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let reviewData = {
        name: document.getElementById("name").value,
        review: document.getElementById("review").value,
        service: document.getElementById("service-rating").value,
        food: document.getElementById("food-rating").value,
        ambience: document.getElementById("ambience-rating").value,
        atmosphere: document.getElementById("atmosphere-rating").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
    });

    fetchReviews();
});

fetchReviews();
