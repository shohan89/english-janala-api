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
// show Loading Spinner
const showLoading = () => {
    const spinner = document.getElementById('spinner');
    const wordContainer = document.getElementById('wordContainer');
    spinner.classList.remove('hidden');
    wordContainer.classList.add('hidden');
}
// hide loading spinner
const hideLoading = () => {
    const spinner = document.getElementById('spinner');
    const wordContainer = document.getElementById('wordContainer');
    spinner.classList.add('hidden');
    wordContainer.classList.remove('hidden');
}
// remove active class
const removeActiveClass = () => {
    const allActiveBtns = document.getElementsByClassName('lesson-btn');
    for (activeBtn of allActiveBtns){
        activeBtn.classList.remove("active");
    }
    // allActiveBtns.forEach(activeBtn => {
    //     activeBtn.classList.remove("active");
    // })
}

// load level wise words via ID
const loadLevelWords = async levelNo => {
    showLoading();
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`);
        const data = await res.json();
        const words = data.data;
        removeActiveClass(); // remove active class from other btn
        const clickedBtn = document.getElementById(`level-btn-${levelNo}`);
        // add active class when btn click
        clickedBtn.classList.add('active');
        displayLevelWords(words);
    } catch (error) {
        console.error('Error fetching lesson words: ', error);
    }
    hideLoading();
}
// load word details
const loadWordDetails = async (wordID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/word/${wordID}`);
    const data = await res.json();
    const wordDetails = data.data;
    displayWordDetails(wordDetails);
}
// display word details
const displayWordDetails = word => {
    // console.log(word);
    const wordDetailContainer = document.getElementById('wordDetailContainer');
    wordDetailContainer.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
            </h2>
          </div>
          <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
            
            ${
                word.synonyms.map(synonym => `<span class="btn">${synonym}</span>`)
            }
          </div>
    `;
    document.getElementById('word_detail').showModal();
}
// show level words
const displayLevelWords = words => {
    showLoading();
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
        `;
        hideLoading();
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
          <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        `;
        wordContainer.appendChild(wordDiv);
    })
    hideLoading();
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
            <button id='level-btn-${level.level_no}' onclick='loadLevelWords(${level.level_no})' class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> 
                Lesson - ${level.level_no}
            </button>
        `;
        levelContainer.appendChild(levelDiv);
    });
}


loadLevels();