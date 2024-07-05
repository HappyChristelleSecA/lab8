
        // Wait for the DOM to be fully loaded before executing the script
        document.addEventListener('DOMContentLoaded', () => {
            // Get references to the DOM elements we'll be interacting with
            const getCatButton = document.getElementById('getCat');
            const imageContainer = document.getElementById('imageContainer');
            const loading = document.getElementById('loading');

            // Add click event listener to the button
            getCatButton.addEventListener('click', fetchCat);

            // Function to fetch a random cat image from the API
            async function fetchCat() {
                // Show loading spinner and clear previous image
                loading.style.display = 'block';
                imageContainer.innerHTML = '';

                try {
                    // Fetch data from the API
                    const response = await fetch('https://api.thecatapi.com/v1/images/search');
                    
                    // Check if the response is ok (status in the range 200-299)
                    if (!response.ok) {
                        throw new Error('HTTP error! status: ${response.status}');
                    }
                    
                    // Parse the JSON response
                    const data = await response.json();
                    
                    // Display the fetched cat image
                    displayCat(data[0]);
                } catch (error) {
                    // Log any errors to the console
                    console.error('There was a problem fetching the cat image:', error);
                    // Display an error message to the user
                    imageContainer.innerHTML = 'Sorry, we couldn\'t fetch a cat image. Please try again later.';
                } finally {
                    // Hide loading spinner regardless of success or failure
                    loading.style.display = 'none';
                }
            }

            // Function to display the fetched cat image
            function displayCat(catData) {
                const img = document.createElement('img');
                img.src = catData.url;
                img.alt = 'Random Cat';
                img.id = 'catImage';
                imageContainer.appendChild(img);
            }
        });
    