const loadLevels = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
        const data = await res.json();
        const levels = data.data;
        displayLevels(levels);
    } catch (error) {
        console.error('Error fetching levels: ', error);
    }
}

// show all levels
const displayLevels = levels => {
    // get the levels container
    const levelContainer = document.getElementById('levelContainer');
    // loop all levels and get single level
    levels.forEach(level => {
        // create level div
        const levelDiv = document.createElement('div');
        // set the innerHTML
        levelDiv.innerHTML = `
            <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> 
                Lesson - ${level.level_no}
            </button>
        `;
        levelContainer.appendChild(levelDiv);
    });
}


loadLevels();