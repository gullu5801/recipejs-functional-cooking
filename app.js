// Wrap entire app in IIFE for encapsulation
const RecipeApp = (() => {
    
    // ============================================
    // RECIPE DATA WITH INGREDIENTS AND STEPS
    // ============================================
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: [
                "400g spaghetti",
                "200g pancetta or guanciale",
                "4 large eggs",
                "100g Pecorino Romano cheese",
                "Black pepper",
                "Salt"
            ],
            steps: [
                "Bring a large pot of salted water to boil",
                "Cook spaghetti according to package directions",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Beat eggs in a bowl",
                        "Grate cheese and add to eggs",
                        "Add generous black pepper",
                        "Mix well"
                    ]
                },
                "Cook pancetta in a large pan until crispy",
                "Drain pasta, reserve 1 cup pasta water",
                "Add hot pasta to pancetta pan (off heat)",
                "Quickly mix in egg mixture, adding pasta water to create creamy sauce",
                "Serve immediately with extra cheese"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
            category: "curry",
            ingredients: [
                "500g chicken breast, cubed",
                "200ml Greek yogurt",
                "400ml coconut milk",
                "400g canned tomatoes",
                "2 tbsp tikka masala paste",
                "1 onion, diced",
                "3 cloves garlic, minced",
                "1 inch ginger, grated"
            ],
            steps: [
                "Marinate chicken in yogurt and half the tikka paste for 30 minutes",
                "Heat oil in a large pan",
                "Cook marinated chicken until golden brown",
                {
                    text: "Make the sauce",
                    substeps: [
                        "Sauté onion until soft",
                        "Add garlic and ginger, cook 1 minute",
                        "Add remaining tikka paste",
                        "Add canned tomatoes and simmer",
                        "Stir in coconut milk"
                    ]
                },
                "Add cooked chicken to sauce",
                "Simmer for 15 minutes",
                "Season with salt and pepper",
                "Serve with basmati rice and naan"
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
            category: "baking",
            ingredients: [
                "500g strong white flour",
                "300ml warm milk",
                "50g sugar",
                "10g salt",
                "7g active dry yeast",
                "250g cold butter"
            ],
            steps: [
                "Mix flour, sugar, salt in a large bowl",
                "Dissolve yeast in warm milk",
                "Combine wet and dry ingredients to form dough",
                "Knead for 5 minutes until smooth",
                "Chill dough for 1 hour",
                "Roll butter into rectangle",
                "Envelope butter in dough",
                "Roll and fold three times with 30-minute rests between",
                "Final roll and shape into croissants",
                "Proof for 2 hours until doubled",
                "Bake at 200°C for 15-20 minutes"
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
            category: "salad",
            ingredients: [
                "2 large tomatoes",
                "1 cucumber",
                "1 red onion",
                "200g feta cheese",
                "100g kalamata olives",
                "Extra virgin olive oil",
                "Red wine vinegar",
                "Dried oregano"
            ],
            steps: [
                "Chop tomatoes into wedges",
                "Slice cucumber into thick rounds",
                "Thinly slice red onion",
                "Crumble feta cheese",
                "Combine all vegetables in large bowl",
                "Add olives and feta",
                "Drizzle with olive oil and vinegar",
                "Season with oregano, salt, and pepper",
                "Toss gently and serve"
            ]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
            category: "meat",
            ingredients: [
                "1kg beef fillet",
                "500g puff pastry",
                "500g mushrooms",
                "200g pâté",
                "8 slices prosciutto",
                "2 egg yolks",
                "Dijon mustard"
            ],
            steps: [
                "Season and sear beef fillet on all sides",
                "Brush with Dijon mustard and cool",
                {
                    text: "Prepare mushroom duxelles",
                    substeps: [
                        "Finely chop mushrooms",
                        "Cook until moisture evaporates",
                        "Season and cool completely",
                        {
                            text: "Check consistency",
                            substeps: [
                                "Should be dry and paste-like",
                                "No liquid should remain"
                            ]
                        }
                    ]
                },
                "Lay out prosciutto slices",
                "Spread pâté over beef",
                "Cover with mushroom mixture",
                "Wrap tightly in plastic and chill",
                "Wrap in puff pastry",
                "Brush with egg wash",
                "Bake at 200°C for 25-30 minutes",
                "Rest for 10 minutes before slicing"
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
            category: "vegetarian",
            ingredients: [
                "2 bell peppers",
                "1 broccoli head",
                "200g snap peas",
                "1 carrot",
                "3 tbsp soy sauce",
                "2 tbsp vegetable oil",
                "2 cloves garlic",
                "1 tsp ginger"
            ],
            steps: [
                "Prepare all vegetables by chopping uniformly",
                "Heat oil in wok or large pan",
                "Add garlic and ginger, stir for 30 seconds",
                "Add harder vegetables first (carrots, broccoli)",
                "Stir-fry for 2-3 minutes",
                "Add softer vegetables (peppers, snap peas)",
                "Continue stir-frying for 2 minutes",
                "Add soy sauce and toss",
                "Serve immediately over rice"
            ]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
            category: "noodles",
            ingredients: [
                "200g rice noodles",
                "300g shrimp",
                "3 tbsp fish sauce",
                "2 tbsp tamarind paste",
                "2 tbsp palm sugar",
                "2 eggs",
                "100g bean sprouts",
                "3 spring onions",
                "50g crushed peanuts"
            ],
            steps: [
                "Soak rice noodles in warm water until soft",
                "Mix fish sauce, tamarind paste, and palm sugar for sauce",
                "Heat oil in wok",
                "Scramble eggs and set aside",
                "Cook shrimp until pink",
                "Add drained noodles",
                "Pour sauce over noodles",
                "Add bean sprouts and spring onions",
                "Toss everything together",
                "Garnish with peanuts and serve with lime"
            ]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
            category: "pizza",
            ingredients: [
                "300g pizza dough",
                "200ml tomato sauce",
                "200g fresh mozzarella",
                "Fresh basil leaves",
                "2 tbsp olive oil",
                "Salt and pepper",
                "Semolina flour"
            ],
            steps: [
                "Preheat oven to 250°C with pizza stone",
                "Roll out pizza dough on floured surface",
                "Transfer to semolina-dusted peel",
                "Spread thin layer of tomato sauce",
                "Tear mozzarella and distribute evenly",
                "Season with salt and pepper",
                "Slide onto hot pizza stone",
                "Bake for 8-10 minutes until golden",
                "Top with fresh basil leaves",
                "Drizzle with olive oil and serve"
            ]
        }
    ];

    // ============================================
    // PRIVATE: STATE
    // ============================================
    let currentFilter = 'all';
    let currentSort = 'none';
    let searchQuery = '';
    let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    let debounceTimer;

    // ============================================
    // PRIVATE: DOM REFERENCES
    // ============================================
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    const searchInput = document.querySelector('#search-input');
    const clearSearchBtn = document.querySelector('#clear-search');
    const recipeCountDisplay = document.querySelector('#recipe-count');

    // ============================================
    // RECURSIVE STEPS RENDERING
    // ============================================
    
    // Recursive function to render steps (handles nesting)
    const renderSteps = (steps, level = 0) => {
        // Determine the CSS class based on nesting level
        const listClass = level === 0 ? 'steps-list' : 'substeps-list';
        
        let html = `<ol class="${listClass}">`;
        
        steps.forEach(step => {
            if (typeof step === 'string') {
                // Simple step - just add as list item
                html += `<li>${step}</li>`;
            } else {
                // Nested step - has text and substeps
                html += `<li>`;
                html += step.text;  // Main step text
                
                if (step.substeps && step.substeps.length > 0) {
                    // RECURSIVE CALL - this is the key!
                    html += renderSteps(step.substeps, level + 1);
                }
                
                html += `</li>`;
            }
        });
        
        html += `</ol>`;
        return html;
    };

    // Create complete steps HTML for a recipe
    const createStepsHTML = (steps) => {
        if (!steps || steps.length === 0) {
            return '<p>No steps available</p>';
        }
        
        // Call the recursive function to generate the nested list
        return renderSteps(steps);
    };

    // ============================================
    // RECIPE CARD CREATION
    // ============================================
    
    //create single recipe card
    const createRecipeCard = (recipe) => {
        // Check if favorited
        const isFavorited = favorites.includes(recipe.id);
        const heartIcon = isFavorited ? '❤️' : '🤍';
        
        return `
            <div class="recipe-card" data-id="${recipe.id}">
                
                <!-- NEW: Favorite Button -->
                <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                        data-recipe-id="${recipe.id}">
                    ${heartIcon}
                </button>
                
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time} min</span>
                    <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
                </div>
                <p>${recipe.description}</p>
                
                <!-- NEW: Toggle Buttons -->
                <div class="card-actions">
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                        📋 Show Steps
                    </button>
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                        🥗 Show Ingredients
                    </button>
                </div>
                
                <!-- NEW: Ingredients Section (hidden by default) -->
                <div class="ingredients-container" data-recipe-id="${recipe.id}">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <!-- NEW: Steps Section (hidden by default) -->
                <div class="steps-container" data-recipe-id="${recipe.id}">
                    <h4>Cooking Steps:</h4>
                    ${createStepsHTML(recipe.steps)}
                </div>
            </div>
        `;
    };

    // ============================================
    // PRIVATE: UI HELPER FUNCTIONS
    // ============================================
    
    // Update active button states
    const updateActiveButtons = () => {
        // Update filter buttons
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === currentFilter);
        });
        
        // Update sort buttons
        sortButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === currentSort);
        });
    };
    
    // Update recipe counter
    const updateRecipeCounter = (showing, total) => {
        if (recipeCountDisplay) {
            recipeCountDisplay.textContent = `Showing ${showing} of ${total} recipes`;
        }
    };
    
    // ============================================
    // PRIVATE: FAVORITES MANAGEMENT
    // ============================================
    
    // Save favorites to localStorage
    const saveFavorites = () => {
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    };
    
    // Toggle favorite status
    const toggleFavorite = (recipeId) => {
        const id = parseInt(recipeId);
        
        if (favorites.includes(id)) {
            // Remove from favorites
            favorites = favorites.filter(favId => favId !== id);
        } else {
            // Add to favorites
            favorites.push(id);
        }
        
        saveFavorites();
        updateDisplay();
    };

    // ============================================
    // PRIVATE: RENDER FUNCTIONS
    // ============================================
    
    //render recipes to the DOM
    const renderRecipes = (recipesToRender) => {
        const recipeCardsHTML = recipesToRender
            .map(createRecipeCard)
            .join('');
        
        recipeContainer.innerHTML = recipeCardsHTML;
    };

    // ============================================
    // PRIVATE: EVENT HANDLERS
    // ============================================
    
    // Handle toggle button clicks using event delegation
    const handleToggleClick = (event) => {
        // Check if clicked element is a toggle button
        if (!event.target.classList.contains('toggle-btn')) {
            return;  // Not a toggle button, ignore
        }
        
        const button = event.target;
        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;  // "steps" or "ingredients"
        
        // Find the corresponding container
        const containerClass = toggleType === 'steps' ? 'steps-container' : 'ingredients-container';
        const container = document.querySelector(`.${containerClass}[data-recipe-id="${recipeId}"]`);
        
        // Toggle visibility
        if (container) {
            container.classList.toggle('visible');
            
            // Update button text
            const isVisible = container.classList.contains('visible');
            if (toggleType === 'steps') {
                button.textContent = isVisible ? '📋 Hide Steps' : '📋 Show Steps';
            } else {
                button.textContent = isVisible ? '🥗 Hide Ingredients' : '🥗 Show Ingredients';
            }
        }
    };
    
    // Handle filter button clicks
    const handleFilterClick = (event) => {
        const filterType = event.target.dataset.filter;
        if (filterType && filterType !== currentFilter) {
            currentFilter = filterType;
            updateDisplay();
        }
    };
    
    // Handle sort button clicks
    const handleSortClick = (event) => {
        const sortType = event.target.dataset.sort;
        if (sortType && sortType !== currentSort) {
            currentSort = sortType;
            updateDisplay();
        }
    };
    
    // Search input handler with debouncing
    const handleSearchInput = (event) => {
        const query = event.target.value;
        
        // Show/hide clear button
        if (clearSearchBtn) {
            clearSearchBtn.style.display = query ? 'block' : 'none';
        }
        
        // Implement debouncing
        clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
            searchQuery = query;
            updateDisplay();
        }, 300);
    };
    
    // Clear search handler
    const handleClearSearch = () => {
        if (searchInput) {
            searchInput.value = '';
        }
        searchQuery = '';
        if (clearSearchBtn) {
            clearSearchBtn.style.display = 'none';
        }
        updateDisplay();
    };
    
    // Favorite button handler (event delegation)
    const handleFavoriteClick = (event) => {
        if (!event.target.classList.contains('favorite-btn')) {
            return;
        }
        
        const recipeId = event.target.dataset.recipeId;
        if (recipeId) {
            toggleFavorite(recipeId);
        }
    };

    // ============================================
    // EVENT LISTENER SETUP
    // ============================================
    
    const setupEventListeners = () => {
        // Event delegation for toggle buttons
        recipeContainer.addEventListener('click', handleToggleClick);
        
        // Filter button listeners
        filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilterClick);
        });
        
        // Sort button listeners
        sortButtons.forEach(btn => {
            btn.addEventListener('click', handleSortClick);
        });
        
        // Search input listener
        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
        }
        
        // Clear search button listener
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', handleClearSearch);
        }
        
        // Favorite button listener (event delegation)
        recipeContainer.addEventListener('click', handleFavoriteClick);
        
        console.log('Event listeners attached!');
    };

    // ============================================
    // PRIVATE: UPDATE DISPLAY FUNCTION
    // ============================================
    
    const updateDisplay = () => {
        let recipesToDisplay = recipes;
        
        // Apply search FIRST
        recipesToDisplay = filterBySearch(recipesToDisplay, searchQuery);
        
        // Then apply filters
        recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
        
        // Then apply sorts
        recipesToDisplay = applySort(recipesToDisplay, currentSort);
        
        // Update counter
        updateRecipeCounter(recipesToDisplay.length, recipes.length);
        
        // Render
        renderRecipes(recipesToDisplay);
        updateActiveButtons();
        
        console.log(`Displaying ${recipesToDisplay.length} of ${recipes.length} recipes`);
    };

    // ============================================
    // INITIALIZATION FUNCTION
    // ============================================
    const init = () => {
        console.log('🍳 RecipeJS initializing...');
        setupEventListeners();
        updateDisplay();
        console.log('✅ RecipeJS ready!');
        console.log(`📊 ${recipes.length} recipes loaded`);
        console.log(`❤️  ${favorites.length} favorites saved`);
    };

    // ============================================
    // PUBLIC API - What's accessible from outside
    // ============================================
    return {
        init: init,
        updateDisplay: updateDisplay
    };
    
})();  // <-- IIFE is immediately invoked

// ============================================
// START THE APP
// ============================================
RecipeApp.init();