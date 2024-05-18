let historyStack = [];
let emptyTile = { row: 8, col: 8 }; // Starting with bottom right as empty tile

document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const tiles = Array.from({ length: 81 }, (_, i) => i).sort(() => Math.random() - 0.5); // Shuffle tiles

    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        tiles.forEach((tile, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            if (tile === 80) return; // Skip the empty tile
            const tileDiv = document.createElement('div');
            tileDiv.textContent = tile + 1;
            tileDiv.dataset.row = row;
            tileDiv.dataset.col = col;
            tileDiv.addEventListener('click', () => moveTile(tileDiv, row, col));
            puzzleContainer.appendChild(tileDiv);
        });
    }

    function moveTile(tile, row, col) {
        const rowDiff = Math.abs(row - emptyTile.row);
        const colDiff = Math.abs(col - emptyTile.col);
        if (rowDiff + colDiff === 1) {
            tile.dataset.row = emptyTile.row;
            tile.dataset.col = emptyTile.col;
            puzzleContainer.removeChild(tile);
            puzzleContainer.appendChild(tile);
            emptyTile = { row, col };
            checkWin();
        }
    }

    function checkWin() {
        const tilesArray = Array.from(puzzleContainer.children);
        for (let i = 0; i < tilesArray.length; i++) {
            const row = Math.floor(i / 9);
            const col = i % 9;
            if (parseInt(tilesArray[i].textContent) !== i + 1) {
                return;
            }
        }
        setTimeout(() => showPage('bts'), 500); // Go to next page if won
    }

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
