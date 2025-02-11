const API_URL = "https://your-backend.onrender.com/api/reviews"; // Change this to your actual backend URL

// ✅ Fetch & Display Reviews
async function fetchReviews() {
    try {
        let response = await fetch(API_URL);
        let reviews = await response.json();

        let reviewContainer = document.getElementById("reviews");
        reviewContainer.innerHTML = "";

        reviews.forEach(review => {
            let reviewElement = document.createElement("div");
            reviewElement.classList.add("review");
            reviewElement.innerHTML = `
                <strong>${review.name}</strong> 
                <p>${review.review}</p>
                <p>⭐ Service: ${"★".repeat(review.service)}</p>
                <p>⭐ Food: ${"★".repeat(review.food)}</p>
                <p>⭐ Ambience: ${"★".repeat(review.ambience)}</p>
                <p>⭐ Atmosphere: ${"★".repeat(review.atmosphere)}</p>
                <hr>
            `;
            reviewContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error("❌ Error fetching reviews:", error);
    }
}

// ✅ Submit Review
document.getElementById("reviewForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let reviewData = {
        name: document.getElementById("name").value,
        review: document.getElementById("review").value,
        service: parseInt(document.getElementById("service-rating").value),
        food: parseInt(document.getElementById("food-rating").value),
        ambience: parseInt(document.getElementById("ambience-rating").value),
        atmosphere: parseInt(document.getElementById("atmosphere-rating").value)
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData)
        });

        if (!response.ok) {
            throw new Error("Failed to submit review. Server responded with " + response.status);
        }

        console.log("✅ Review added successfully!");
        fetchReviews();
    } catch (error) {
        console.error("❌ Error submitting review:", error);
        alert("Error submitting review. Please try again.");
    }
});

// ✅ Load Reviews on Page Load
fetchReviews();


