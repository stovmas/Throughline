/**
 * Throughline — Game Engine
 */

(function () {
    'use strict';

    // ---- State ----
    const state = {
        puzzle: null,
        tiles: [],
        selected: new Set(),   // indices into tiles array
        solved: [],            // group indices that have been solved
        attemptsLeft: 3,
        timerSeconds: 0,
        timerInterval: null,
        gameOver: false,
        gameWon: false,
        startTime: null
    };

    // ---- DOM refs ----
    const $ = id => document.getElementById(id);
    const splashScreen = $('splash-screen');
    const gameScreen = $('game-screen');
    const resultScreen = $('result-screen');
    const archiveScreen = $('archive-screen');
    const gameGrid = $('game-grid');
    const solvedGroups = $('solved-groups');
    const timerEl = $('timer');
    const attemptsEl = $('attempts');
    const submitBtn = $('submit-btn');
    const deselectBtn = $('deselect-btn');
    const statusMessage = $('status-message');
    const playBtn = $('play-btn');
    const archiveBtn = $('archive-btn');
    const archiveBackBtn = $('archive-back-btn');

    // ---- Init ----
    function init() {
        state.puzzle = getCurrentPuzzle();
        state.tiles = getPuzzleTiles(state.puzzle);

        // Update puzzle number in UI
        document.querySelector('.puzzle-number').textContent = `#${state.puzzle.id}`;
        playBtn.textContent = `Play Puzzle #${state.puzzle.id}`;

        playBtn.addEventListener('click', startGame);
        submitBtn.addEventListener('click', handleSubmit);
        deselectBtn.addEventListener('click', deselectAll);
        archiveBtn.addEventListener('click', showArchive);
        archiveBackBtn.addEventListener('click', hideArchive);
    }

    function startGame() {
        splashScreen.classList.remove('active');
        gameScreen.classList.add('active');
        renderGrid();
        startTimer();
    }

    // ---- Timer ----
    function startTimer() {
        state.startTime = Date.now();
        state.timerInterval = setInterval(() => {
            state.timerSeconds = Math.floor((Date.now() - state.startTime) / 1000);
            timerEl.textContent = formatTime(state.timerSeconds);
        }, 200);
    }

    function stopTimer() {
        clearInterval(state.timerInterval);
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    // ---- Rendering ----
    function renderGrid() {
        gameGrid.innerHTML = '';
        const remainingTiles = state.tiles.filter(t => !state.solved.includes(t.groupIndex));

        remainingTiles.forEach((tile, displayIndex) => {
            const tileIdx = tile.idx;
            const el = document.createElement('div');
            el.className = 'grid-tile';
            el.dataset.index = tileIdx;

            if (state.selected.has(tileIdx)) {
                el.classList.add('selected');
            }

            // Cover image — full square, no cropping
            const img = document.createElement('img');
            img.className = 'tile-cover';
            img.alt = tile.title;
            img.loading = 'lazy';
            img.src = tile.image;
            img.onerror = function () {
                const placeholder = document.createElement('div');
                placeholder.className = 'tile-cover-placeholder';
                placeholder.style.background = getPlaceholderGradient(tileIdx);
                placeholder.innerHTML = `
                    <span class="placeholder-title">${escapeHtml(tile.title)}</span>
                    <span class="placeholder-author">${escapeHtml(tile.author)}</span>
                `;
                this.replaceWith(placeholder);
            };

            // Title + author below cover
            const info = document.createElement('div');
            info.className = 'tile-info';
            info.innerHTML = `
                <div class="tile-title">${escapeHtml(tile.title)}</div>
                <div class="tile-author">${escapeHtml(tile.author)}</div>
            `;

            el.appendChild(img);
            el.appendChild(info);

            el.addEventListener('click', () => toggleSelect(tileIdx));
            gameGrid.appendChild(el);
        });

        updateControls();
    }

    function getPlaceholderGradient(index) {
        const gradients = [
            'linear-gradient(135deg, #1a1a2e, #16213e)',
            'linear-gradient(135deg, #0f3460, #16213e)',
            'linear-gradient(135deg, #1a1a2e, #533483)',
            'linear-gradient(135deg, #2c3e50, #1a1a2e)',
            'linear-gradient(135deg, #16213e, #1a1a2e)',
            'linear-gradient(135deg, #1a1a2e, #0f3460)',
        ];
        return gradients[index % gradients.length];
    }

    // ---- Selection ----
    function toggleSelect(index) {
        if (state.gameOver) return;

        if (state.selected.has(index)) {
            state.selected.delete(index);
        } else if (state.selected.size < 4) {
            state.selected.add(index);
        }

        // Update tile visual immediately
        const tileEl = gameGrid.querySelector(`[data-index="${index}"]`);
        if (tileEl) {
            tileEl.classList.toggle('selected', state.selected.has(index));
        }

        updateControls();
        clearStatus();
    }

    function deselectAll() {
        state.selected.clear();
        gameGrid.querySelectorAll('.grid-tile').forEach(el => el.classList.remove('selected'));
        updateControls();
        clearStatus();
    }

    function updateControls() {
        const count = state.selected.size;
        submitBtn.disabled = count !== 4;
        deselectBtn.disabled = count === 0;
    }

    // ---- Submit / Validation ----
    function handleSubmit() {
        if (state.selected.size !== 4 || state.gameOver) return;

        const selectedTiles = [...state.selected].map(i => state.tiles[i]);
        const groupCounts = {};

        // Debug: log what was selected to help diagnose issues
        console.log('[Throughline] Selected:', selectedTiles.map(t => t ? `${t.title} (group ${t.groupIndex})` : 'UNDEFINED'));

        selectedTiles.forEach(t => {
            if (t) {
                groupCounts[t.groupIndex] = (groupCounts[t.groupIndex] || 0) + 1;
            }
        });

        // Check if all 4 belong to the same group
        const groups = Object.entries(groupCounts);
        console.log('[Throughline] Group counts:', groupCounts);
        if (groups.length === 1 && groups[0][1] === 4) {
            // Correct!
            handleCorrectGuess(parseInt(groups[0][0]));
        } else {
            // Check for "one away"
            const maxInGroup = Math.max(...Object.values(groupCounts));
            handleIncorrectGuess(maxInGroup === 3);
        }
    }

    function handleCorrectGuess(groupIndex) {
        const group = state.puzzle.groups[groupIndex];
        state.solved.push(groupIndex);
        state.selected.clear();

        // Animate correct tiles
        const selectedEls = gameGrid.querySelectorAll('.grid-tile.selected');
        selectedEls.forEach(el => el.classList.add('correct'));

        // Show solved group banner
        setTimeout(() => {
            renderSolvedGroup(group, groupIndex);
            renderGrid();

            // Check win condition
            if (state.solved.length === 3) {
                state.gameWon = true;
                state.gameOver = true;
                stopTimer();
                setTimeout(() => showResult(), 600);
            } else {
                showStatus(`Found it! "${group.theme}"`, 'success');
            }
        }, 500);
    }

    function handleIncorrectGuess(isOneAway) {
        state.attemptsLeft--;
        updateAttemptDots();

        // Shake animation on selected tiles
        const selectedEls = gameGrid.querySelectorAll('.grid-tile.selected');
        selectedEls.forEach(el => {
            el.classList.add('incorrect');
            setTimeout(() => el.classList.remove('incorrect'), 600);
        });

        if (isOneAway) {
            showStatus('So close! One away...', 'warning');
        } else {
            showStatus('Not quite — try again!', 'error');
        }

        state.selected.clear();
        setTimeout(() => renderGrid(), 600);

        if (state.attemptsLeft <= 0) {
            state.gameOver = true;
            stopTimer();
            setTimeout(() => revealAllAndShowResult(), 800);
        }
    }

    function updateAttemptDots() {
        const dots = attemptsEl.querySelectorAll('.attempt-dot');
        dots.forEach((dot, i) => {
            if (i < state.attemptsLeft) {
                dot.className = 'attempt-dot active';
            } else {
                dot.className = 'attempt-dot lost';
            }
        });
    }

    function revealAllAndShowResult() {
        // Reveal remaining groups
        state.puzzle.groups.forEach((group, i) => {
            if (!state.solved.includes(i)) {
                renderSolvedGroup(group, i);
            }
        });
        gameGrid.innerHTML = '';
        setTimeout(() => showResult(), 800);
    }

    function renderSolvedGroup(group, groupIndex) {
        const el = document.createElement('div');
        el.className = 'solved-group';
        el.dataset.group = group.color;

        const titleList = group.titles.map(t => t.title).join(' · ');
        el.innerHTML = `
            <div class="solved-group-theme">${escapeHtml(group.theme)}</div>
            <div class="solved-group-titles">${escapeHtml(titleList)}</div>
        `;
        solvedGroups.appendChild(el);
    }

    // ---- Status Messages ----
    function showStatus(msg, type) {
        statusMessage.textContent = msg;
        statusMessage.className = `status-message ${type}`;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }

    // ---- Result Screen ----
    function showResult() {
        gameScreen.classList.remove('active');
        resultScreen.classList.add('active');

        const resultIcon = $('result-icon');
        const resultTitle = $('result-title');
        const resultSubtitle = $('result-subtitle');
        const resultSummary = $('result-summary');

        if (state.gameWon) {
            resultIcon.textContent = '🏆';
            resultTitle.textContent = 'Brilliant!';
            resultSubtitle.textContent = 'You found all the throughlines!';
        } else {
            resultIcon.textContent = '📚';
            resultTitle.textContent = 'Better Luck Next Week';
            resultSubtitle.textContent = `You found ${state.solved.length} of 3 throughlines`;
        }

        const mistakesMade = 3 - state.attemptsLeft;
        resultSummary.innerHTML = `
            <div class="result-stat">
                <span class="result-stat-label">Puzzle</span>
                <span class="result-stat-value">#${state.puzzle.id}</span>
            </div>
            <div class="result-stat">
                <span class="result-stat-label">Groups Found</span>
                <span class="result-stat-value">${state.solved.length} / 3</span>
            </div>
            <div class="result-stat">
                <span class="result-stat-label">Mistakes</span>
                <span class="result-stat-value">${mistakesMade}</span>
            </div>
            <div class="result-stat">
                <span class="result-stat-label">Time</span>
                <span class="result-stat-value">${formatTime(state.timerSeconds)}</span>
            </div>
        `;

        // Render group breakdown with covers
        const resultGroups = $('result-groups');
        resultGroups.innerHTML = '';
        state.puzzle.groups.forEach((group, i) => {
            const wasSolved = state.solved.includes(i);
            const groupEl = document.createElement('div');
            groupEl.className = 'result-group';
            groupEl.dataset.group = group.color;

            const coversHtml = group.titles.map(t => {
                const audibleUrl = `https://www.audible.com/search?keywords=${encodeURIComponent(t.title + ' ' + t.author)}`;
                return `<a class="result-cover-link" href="${audibleUrl}" target="_blank" rel="noopener noreferrer">
                    <img class="result-group-cover" src="${escapeHtml(t.image)}" alt="${escapeHtml(t.title)}">
                    <span class="result-cover-overlay">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        See on Audible
                    </span>
                </a>`;
            }).join('');

            groupEl.innerHTML = `
                <div class="result-group-header">
                    <span class="result-group-status">${wasSolved ? '✅' : '❌'}</span>
                    <span class="result-group-theme">${escapeHtml(group.theme)}</span>
                </div>
                <div class="result-group-description">${escapeHtml(group.description)}</div>
                <div class="result-group-covers">${coversHtml}</div>
                <div class="result-group-titles">${group.titles.map(t => escapeHtml(t.title)).join(' · ')}</div>
            `;
            resultGroups.appendChild(groupEl);
        });

        generateShareCard();
        setupNextPuzzleCountdown();

        $('share-btn').addEventListener('click', shareResult);
        $('copy-btn').addEventListener('click', copyResult);
        $('other-puzzles-btn').addEventListener('click', () => {
            resultScreen.classList.remove('active');
            archiveScreen.classList.add('active');
            renderArchive();
        });
    }

    // ---- Share Card (Canvas) ----
    function generateShareCard() {
        const canvas = $('share-canvas');
        const ctx = canvas.getContext('2d');
        const W = 600;
        const H = 800;
        canvas.width = W;
        canvas.height = H;

        // Background — warm cream
        ctx.fillStyle = '#F5F0E8';
        ctx.fillRect(0, 0, W, H);

        // Top accent bar
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, '#D4940A');
        grad.addColorStop(1, '#E5A61B');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, 6);

        // Audible label
        ctx.fillStyle = '#888888';
        ctx.font = '500 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '2px';
        ctx.fillText('An Audible Original Game', W / 2, 60);

        // Title
        ctx.fillStyle = '#1A1A1A';
        ctx.font = 'bold 40px Inter, sans-serif';
        ctx.fillText('THROUGHLINE', W / 2, 110);

        // Underline
        ctx.strokeStyle = '#D4940A';
        ctx.lineWidth = 3;
        const textWidth = ctx.measureText('THROUGHLINE').width;
        ctx.beginPath();
        ctx.moveTo((W - textWidth) / 2, 118);
        ctx.lineTo((W + textWidth) / 2, 118);
        ctx.stroke();

        // Puzzle number
        ctx.fillStyle = '#888888';
        ctx.font = '500 18px Inter, sans-serif';
        ctx.fillText(`Puzzle #${state.puzzle.id}`, W / 2, 150);

        // Result
        const mistakesMade = 3 - state.attemptsLeft;
        if (state.gameWon) {
            ctx.fillStyle = '#2D8A4E';
            ctx.font = 'bold 28px Inter, sans-serif';
            ctx.fillText('Solved!', W / 2, 200);
        } else {
            ctx.fillStyle = '#C0392B';
            ctx.font = 'bold 28px Inter, sans-serif';
            ctx.fillText(`${state.solved.length}/3 Found`, W / 2, 200);
        }

        // Stats
        ctx.fillStyle = '#555555';
        ctx.font = '600 20px Inter, sans-serif';
        ctx.fillText(`${formatTime(state.timerSeconds)}  ·  ${mistakesMade} mistake${mistakesMade !== 1 ? 's' : ''}`, W / 2, 240);

        // Group emoji results grid
        const groupColors = ['#D4940A', '#2978B5', '#7B4EA3'];
        const groupLabels = ['🟧', '🟦', '🟪'];
        let y = 290;

        state.puzzle.groups.forEach((group, i) => {
            const solved = state.solved.includes(i);
            const color = groupColors[group.color];

            // Group row background
            ctx.fillStyle = solved ? color + '18' : '#E8E3DA';
            roundRect(ctx, 40, y, W - 80, 60, 10);
            ctx.fill();

            // Border
            ctx.strokeStyle = solved ? color + '44' : '#00000010';
            ctx.lineWidth = 1;
            roundRect(ctx, 40, y, W - 80, 60, 10);
            ctx.stroke();

            // Status emoji
            ctx.font = '22px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(solved ? '✅' : '❌', 60, y + 38);

            // Theme name
            ctx.fillStyle = solved ? color : '#888888';
            ctx.font = `600 16px Inter, sans-serif`;
            ctx.fillText(group.theme, 95, y + 38);

            y += 75;
        });

        // Footer branding
        y += 20;
        ctx.fillStyle = '#888888';
        ctx.font = '500 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('audible.com/throughline', W / 2, y + 10);

        ctx.fillStyle = '#AAAAAA';
        ctx.font = '400 12px Inter, sans-serif';
        ctx.fillText('Find the hidden connection between audiobook titles', W / 2, H - 30);

        // Render preview
        const previewEl = $('share-card-preview');
        const imgEl = document.createElement('img');
        imgEl.src = canvas.toDataURL('image/png');
        imgEl.alt = 'Share card';
        previewEl.innerHTML = '';
        previewEl.appendChild(imgEl);
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    // ---- Share Actions ----
    async function shareResult() {
        const canvas = $('share-canvas');
        const mistakesMade = 3 - state.attemptsLeft;
        const text = `Throughline #${state.puzzle.id}\n` +
            `${state.gameWon ? '🏆 Solved' : `📚 ${state.solved.length}/3`} · ${formatTime(state.timerSeconds)} · ${mistakesMade} mistake${mistakesMade !== 1 ? 's' : ''}\n\n` +
            state.puzzle.groups.map((g, i) =>
                `${state.solved.includes(i) ? '✅' : '❌'} ${g.theme}`
            ).join('\n');

        if (navigator.share) {
            try {
                const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
                const file = new File([blob], 'throughline.png', { type: 'image/png' });
                await navigator.share({
                    text,
                    files: [file]
                });
            } catch (e) {
                // Fallback to text-only share
                try {
                    await navigator.share({ text });
                } catch (_) {
                    copyToClipboard(text);
                }
            }
        } else {
            copyToClipboard(text);
        }
    }

    function copyResult() {
        const mistakesMade = 3 - state.attemptsLeft;
        const text = `Throughline #${state.puzzle.id}\n` +
            `${state.gameWon ? '🏆 Solved' : `📚 ${state.solved.length}/3`} · ${formatTime(state.timerSeconds)} · ${mistakesMade} mistake${mistakesMade !== 1 ? 's' : ''}\n\n` +
            state.puzzle.groups.map((g, i) =>
                `${state.solved.includes(i) ? '✅' : '❌'} ${g.theme}`
            ).join('\n');

        copyToClipboard(text);
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(() => {
            showToast('Could not copy');
        });
    }

    // ---- Toast ----
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ---- Next Puzzle Countdown ----
    function setupNextPuzzleCountdown() {
        const countdownEl = $('next-puzzle-countdown');
        function update() {
            const now = new Date();
            // Next Monday at midnight
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7 || 7));
            nextMonday.setHours(0, 0, 0, 0);

            const diff = nextMonday - now;
            if (diff <= 0) {
                countdownEl.textContent = 'now!';
                return;
            }

            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);

            const parts = [];
            if (days > 0) parts.push(`${days}d`);
            parts.push(`${hours}h`);
            parts.push(`${mins}m`);
            countdownEl.textContent = parts.join(' ');
        }

        update();
        setInterval(update, 60000);
    }

    // ---- Util ----
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ---- Archive ----
    function showArchive() {
        splashScreen.classList.remove('active');
        archiveScreen.classList.add('active');
        renderArchive();
    }

    function hideArchive() {
        archiveScreen.classList.remove('active');
        splashScreen.classList.add('active');
    }

    function renderArchive() {
        const list = $('archive-list');
        list.innerHTML = '';
        const now = new Date();
        const currentPuzzle = getCurrentPuzzle();

        PUZZLES.forEach(puzzle => {
            const card = document.createElement('div');
            card.className = 'archive-card';
            const puzzleDate = new Date(puzzle.week);
            const isCurrent = puzzle.id === currentPuzzle.id;
            const isUpcoming = puzzleDate > now;

            if (isCurrent) card.classList.add('current');

            const dateStr = puzzleDate.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });

            let badgeClass, badgeText;
            if (isCurrent) {
                badgeClass = 'current-badge';
                badgeText = 'This Week';
            } else if (isUpcoming) {
                badgeClass = 'past-badge';
                badgeText = 'Play';
            } else {
                badgeClass = 'past-badge';
                badgeText = 'Play';
            }

            card.innerHTML = `
                <div class="archive-card-info">
                    <span class="archive-card-number">Puzzle #${puzzle.id}</span>
                    <span class="archive-card-date">${dateStr}</span>
                </div>
                <span class="archive-card-badge ${badgeClass}">${badgeText}</span>
            `;

            card.addEventListener('click', () => {
                loadPuzzle(puzzle);
                archiveScreen.classList.remove('active');
                gameScreen.classList.add('active');
                renderGrid();
                startTimer();
            });

            list.appendChild(card);
        });
    }

    function loadPuzzle(puzzle) {
        // Reset game state
        state.puzzle = puzzle;
        state.tiles = getPuzzleTiles(puzzle);
        state.selected = new Set();
        state.solved = [];
        state.attemptsLeft = 3;
        state.timerSeconds = 0;
        state.timerInterval && clearInterval(state.timerInterval);
        state.timerInterval = null;
        state.gameOver = false;
        state.gameWon = false;
        state.startTime = null;

        // Reset UI
        document.querySelector('.puzzle-number').textContent = `#${puzzle.id}`;
        timerEl.textContent = '0:00';
        solvedGroups.innerHTML = '';
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
        attemptsEl.innerHTML = `
            <span class="attempt-dot active"></span>
            <span class="attempt-dot active"></span>
            <span class="attempt-dot active"></span>
        `;
    }

    // ---- Boot ----
    document.addEventListener('DOMContentLoaded', init);
})();
