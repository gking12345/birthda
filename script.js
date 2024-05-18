let historyStack = [];

document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const wordListContainer = document.getElementById('word-list');
    const checkButton = document.getElementById('checkButton');

    const words = ['HAPPY', 'BIRTH', 'DAY', 'TANISHA'];
    const gridSize = 10;

    const grid = [
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'I', 'S', 'X', 'X', 'H', 'A', 'X', 'X'],
        ['X', 'N', 'X', 'X', 'H', 'A', 'X', 'X', 'P', 'X'],
        ['X', 'A', 'X', 'X', 'X', 'X', 'X', 'X', 'P', 'X'],
        ['X', 'T', 'X', 'X', 'X', 'X', 'X', 'X', 'Y', 'X'],
        ['X', 'Y', 'X', 'X', 'X', 'X', 'X', 'X', 'B', 'X'],
        ['X', 'X', 'A', 'X', 'X', 'X', 'X', 'I', 'X', 'X'],
        ['X', 'X', 'X', 'D', 'X', 'X', 'R', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'H', 'T', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
        ];

    let selectedCells = [];

    function createPuzzle() {
        grid.forEach((row, rowIndex) => {
            row.forEach((letter, colIndex) => {
                const cell = document.createElement('div');
                cell.textContent = letter;
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                cell.addEventListener('click', () => selectCell(cell));
                puzzleContainer.appendChild(cell);
            });
        });

        words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = word;
            wordListContainer.appendChild(listItem);
        });
    }

    function selectCell(cell) {
        if (cell.classList.contains('found')) return;

        if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
            selectedCells = selectedCells.filter(selectedCell => selectedCell !== cell);
        } else {
            cell.classList.add('selected');
            selectedCells.push(cell);
        }
    }

    function checkWords() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        if (words.includes(selectedWord)) {
            selectedCells.forEach(cell => {
                cell.classList.add('found');
                cell.classList.remove('selected');
            });
            words.splice(words.indexOf(selectedWord), 1);
        } else {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
        }
        selectedCells = [];
    }

    checkButton.addEventListener('click', checkWords);

    createPuzzle();

    // Background Music Controls
    const backgroundAudio = document.getElementById('background-audio');
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');

    playButton.addEventListener('click', () => {
        backgroundAudio.play();
    });

    pauseButton.addEventListener('click', () => {
        backgroundAudio.pause();
    });
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    historyStack.push(pageId);
}

function goBack() {
    historyStack.pop(); // Remove current page
    const previousPage = historyStack.pop(); // Get the previous page
    if (previousPage) {
        showPage(previousPage);
    }
}

// Initially show the cover page
showPage('cover');
 function checkWords() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        if (words.includes(selectedWord)) {
            selectedCells.forEach(cell => {
                cell.classList.add('found');
                cell.classList.remove('selected');
            });
            words.splice(words.indexOf(selectedWord), 1);
            updateWordList();
            if (words.length === 0) {
                setTimeout(() => {
                    showPage('bts');
                }, 1000);
            }
        } else {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
        }
        selectedCells = [];
    }

    function updateWordList() {
        wordListContainer.innerHTML = '';
        words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = word;
            wordListContainer.appendChild(listItem);
        });
    }

    checkButton.addEventListener('click', checkWords);


