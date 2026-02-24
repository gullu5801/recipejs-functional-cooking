// [PART 3] IIFE MODULE PATTERN
// Keeps global scope clean
const RecipeApp = (() => {

    // [PART 1 & 3] DATA
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: ["400g spaghetti", "4 large eggs", "100g parmesan cheese", "150g pancetta", "Black pepper", "Salt"],
            steps: ["Boil a large pot of salted water.", "Cook spaghetti until al dente.", { text: "Prepare the sauce:", substeps: ["Whisk eggs and cheese in a bowl.", "Season generously with pepper."] }, "Fry pancetta until crisp.", "Toss hot pasta with pancetta and egg mixture (off heat)."]
        },
        {
            id: 2, title: "Chicken Tikka Masala", time: 45, difficulty: "medium", description: "Tender chicken pieces in a creamy, spiced tomato sauce.", category: "curry",
            ingredients: ["Chicken", "Yogurt", "Tomato puree", "Cream", "Garlic", "Spices"], steps: [{ text: "Marinate chicken", substeps: ["Mix yogurt/spices", "Rest 20 mins"] }, "Cook chicken", { text: "Make sauce", substeps: ["Sauté aromatics", "Add puree", "Add cream"] }, "Combine"]
        },
        {
            id: 3, title: "Homemade Croissants", time: 180, difficulty: "hard", description: "Buttery, flaky French pastries.", category: "baking",
            ingredients: ["Flour", "Butter", "Yeast", "Milk", "Sugar"], steps: ["Mix dough", { text: "Laminate", substeps: ["Fold butter", "Roll", "Chill"] }, "Bake"]
        },
        {
            id: 4, title: "Greek Salad", time: 15, difficulty: "easy", description: "Fresh vegetables and feta.", category: "salad",
            ingredients: ["Cucumber", "Tomato", "Feta", "Olives"], steps: ["Chop veggies", "Mix in bowl", "Add feta", "Drizzle oil"]
        },
        {
            id: 5, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Beef fillet in puff pastry.", category: "meat",
            ingredients: ["Beef", "Mushrooms", "Prosciutto", "Puff pastry"], steps: ["Sear beef", { text: "Make duxelles", substeps: ["Chop mushrooms", "Fry dry"] }, "Wrap", "Bake"]
        },
        {
            id: 6, title: "Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Quick veggies in sauce.", category: "vegetarian",
            ingredients: ["Broccoli", "Carrots", "Soy sauce", "Ginger"], steps: ["Chop", "Stir fry", "Add sauce", "Serve"]
        },
        {
            id: 7, title: "Pad Thai", time: 30, difficulty: "medium", description: "Thai rice noodles.", category: "noodles",
            ingredients: ["Noodles", "Shrimp", "Peanuts", "Tamarind", "Egg"], steps: ["Soak noodles", { text: "Sauce", substeps: ["Mix tamarind", "Fish sauce"] }, "Fry", "Toss"]
        },
        {
            id: 8, title: "Margherita Pizza", time: 60, difficulty: "medium", description: "Classic Italian pizza.", category: "pizza",
            ingredients: ["Dough", "Tomatoes", "Mozzarella", "Basil"], steps: ["Stretch dough", "Add sauce", "Add cheese", "Bake"]
        }
    ];

    // [PART 2 & 4] STATE MANAGEMENT
    let currentFilter = 'all';
    let currentSort = 'none';

    // [PART 4 NEW] Search & Favorites State
    let searchQuery = '';
    // Load favorites from LocalStorage OR default to empty array
    let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    let debounceTimer; // For search performance

    // [PART 1 & 4] DOM ELEMENTS
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    // [PART 4 NEW]
    const searchInput = document.querySelector('#search-input');
    const clearSearchBtn = document.querySelector('#clear-search');
    const recipeCounter = document.querySelector('#recipe-counter');

    // HELPER FUNCTIONS

    // [PART 3] Recursive Step Rendering
    const renderSteps = (steps) => {
        let html = '<ul class="steps-list">';
        steps.forEach(step => {
            if (typeof step === 'string') {
                html += `<li class="step-item"><span class="step-text">${step}</span></li>`;
            } else {
                html += `<li class="step-item"><span class="step-text">${step.text}</span>
                         <div class="substeps">${renderSteps(step.substeps)}</div></li>`;
            }
        });
        return html + '</ul>';
    };

    // [PART 3] Ingredients List
    const createIngredientsHTML = (ingredients) => {
        return `<h4>🛒 Ingredients</h4><ul class="ingredients-list">${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>`;
    };

    // [PART 1, 3, 4] Card Creator
    const createRecipeCard = (recipe) => {
        // [PART 4 NEW] Check if recipe is favorited
        const isFavorite = favorites.includes(recipe.id);
        const heartClass = isFavorite ? 'fas fa-heart active' : 'far fa-heart';

        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-action="favorite" data-id="${recipe.id}">
                    <i class="${heartClass}"></i>
                </button>

                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time} min</span>
                    <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
                </div>
                <p>${recipe.description}</p>
                
                <div class="card-actions">
                    <button class="view-btn toggle-btn" data-action="ingredients" data-id="${recipe.id}">Show Ingredients</button>
                    <button class="view-btn toggle-btn" data-action="steps" data-id="${recipe.id}">Show Steps</button>
                </div>

                <div class="ingredients-container" id="ingredients-${recipe.id}">
                    ${createIngredientsHTML(recipe.ingredients)}
                </div>
                <div class="steps-container" id="steps-${recipe.id}">
                    <h4>👩‍🍳 Instructions</h4>
                    ${renderSteps(recipe.steps)}
                </div>
            </div>
        `;
    };


    // LOGIC: FILTER / SORT / SEARCH

    // [PART 4 NEW] Search Logic
    const applySearch = (recipes, query) => {
        if (!query) return recipes;
        const lowerQuery = query.toLowerCase();
        return recipes.filter(recipe => {
            const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);
            // .some() returns true if ANY ingredient matches
            const ingredientMatch = recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery));
            return titleMatch || ingredientMatch;
        });
    };

    // [PART 2 & 4] Filter Logic
    const applyFilter = (recipes, filterType) => {
        switch (filterType) {
            case 'favorites': return recipes.filter(r => favorites.includes(r.id)); // [PART 4 NEW]
            case 'easy': return recipes.filter(r => r.difficulty === 'easy');
            case 'medium': return recipes.filter(r => r.difficulty === 'medium');
            case 'hard': return recipes.filter(r => r.difficulty === 'hard');
            case 'quick': return recipes.filter(r => r.time <= 30);
            default: return recipes;
        }
    };

    // [PART 2] Sort Logic
    const applySort = (recipes, sortType) => {
        const sorted = [...recipes];
        switch (sortType) {
            case 'name': return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'time': return sorted.sort((a, b) => a.time - b.time);
            default: return sorted;
        }
    };

    // [PART 4 NEW] Update Counter
    const updateCounter = (count) => {
        recipeCounter.textContent = `Showing ${count} of ${recipes.length} recipes`;
    };

    // [PART 4 UPDATE] Main Display Loop
    const updateDisplay = () => {
        // 1. Apply Search
        let result = applySearch(recipes, searchQuery);

        // 2. Apply Filter
        result = applyFilter(result, currentFilter);

        // 3. Apply Sort
        result = applySort(result, currentSort);

        // 4. Render
        recipeContainer.innerHTML = result.map(createRecipeCard).join('');

        // [PART 4 NEW] Update Counter & Clear Button
        updateCounter(result.length);
        if (searchQuery) clearSearchBtn.classList.remove('hidden');
        else clearSearchBtn.classList.add('hidden');

        updateActiveButtons();
    };

    // [PART 2] Update Button Styles
    const updateActiveButtons = () => {
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === currentFilter));
        sortButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.sort === currentSort));
    };

    // EVENT HANDLERS

    // [PART 4 NEW] Toggle Favorites
    const toggleFavorite = (id) => {
        const recipeId = parseInt(id);
        if (favorites.includes(recipeId)) {
            favorites = favorites.filter(favId => favId !== recipeId); // Remove
        } else {
            favorites.push(recipeId); // Add
        }
        // Save to LocalStorage
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
        updateDisplay();
    };

    // [PART 3 & 4] Event Delegation (One listener for all card clicks)
    const handleContainerClick = (e) => {
        const target = e.target.closest('button'); // Catch clicks on icons inside buttons
        if (!target) return;

        const action = target.dataset.action;
        const id = target.dataset.id;

        if (action === 'favorite') {
            toggleFavorite(id); // [PART 4 NEW]
        } else if (action === 'ingredients' || action === 'steps') {
            // [PART 3] Expand Logic
            const container = document.getElementById(`${action}-${id}`);
            container.classList.toggle('visible');
            const isVisible = container.classList.contains('visible');
            const textMap = {
                'ingredients': isVisible ? 'Hide Ingredients' : 'Show Ingredients',
                'steps': isVisible ? 'Hide Steps' : 'Show Steps'
            };
            target.textContent = textMap[action];
        }
    };

    const setupEventListeners = () => {
        // [PART 2] Filters/Sorts
        filterButtons.forEach(btn => btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            updateDisplay();
        }));

        sortButtons.forEach(btn => btn.addEventListener('click', (e) => {
            currentSort = e.target.dataset.sort;
            updateDisplay();
        }));

        // [PART 4 NEW] Search with Debouncing
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer); // Clear previous timer
            debounceTimer = setTimeout(() => {
                searchQuery = e.target.value.trim();
                updateDisplay();
            }, 300); // Wait 300ms after typing stops
        });

        // [PART 4 NEW] Clear Search
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            updateDisplay();
        });

        // [PART 3] Event Delegation
        recipeContainer.addEventListener('click', handleContainerClick);
    };

    // INIT
    return {
        init: () => {
            console.log('RecipeApp: Initializing...');
            setupEventListeners();
            updateDisplay();
            console.log('RecipeApp: Ready! 🚀');
        }
    };

})();

RecipeApp.init();