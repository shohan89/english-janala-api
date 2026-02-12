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
    // handle empty lesson state
    if (words.length === 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full py-10 space-y-6">
                <img class="mx-auto" src="./assets/alert-error.png" />
                <p class="text-xl font-medium font-bangla text-gray-400">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2 class="text-4xl font-medium font-bangla">
                নেক্সট Lesson এ যান
                </h2>
            </div>
        `
        return;
    }
    // console.log(words);
    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
            <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-6"
      >
        <h2 class="text-3xl font-bold">${word.word}</h2>
        <p class="text-xl font-medium">Meaning /Pronounciation</p>
        <div class="font-bangla text-3xl font-bold">
          "${
            word.meaning ? word.meaning : 'No Meaning'
          } / ${word.pronunciation}"
        </div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
        </div>
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