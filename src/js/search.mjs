
export function initSearch() {
    document.addEventListener
        console.log("search init running...");
        const form = document.getElementById("search-form");
        console.log("form found?", form);

        if (!form) {
            console.log("no search form found")
            return
        };

        form.addEventListener("submit", (event) => {
            console.log("Form submit triggered!");
            event.preventDefault();
            const query = document.getElementById("search-input").value.trim();
            console.log("Submitting search for:", query);

            if (query) {
                window.location.href = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
            }
        })
    
}