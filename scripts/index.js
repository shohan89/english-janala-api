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

// load level wise words via ID
const loadLevelWords = async levelNo => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`);
        const data = await res.json();
        const words = data.data;
        displayLevelWords(words);
    } catch (error) {
        console.error('Error fetching lesson words: ', error);
    }
}

// show level words
const displayLevelWords = words => {
    const wordContainer = document.getElementById('wordContainer');
    // clear wordContainer section
    wordContainer.innerHTML = '';
    // console.log(words);
    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
            <div
            class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-6"
        >
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p class="text-xl font-medium">Meaning /Pronounciation</p>
            <div class="font-bangla text-3xl font-bold">"${word.meaning} / ${word.pronunciation}"</div>
      </div>
        `;
        wordContainer.appendChild(wordDiv);
    })
    // clear wordContainer section
    // wordContainer.innerHTML = '';
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
            <button onclick='loadLevelWords(${level.level_no})' class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> 
                Lesson - ${level.level_no}
            </button>
        `;
        levelContainer.appendChild(levelDiv);
    });
}


loadLevels();