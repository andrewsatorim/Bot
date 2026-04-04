// ===== Storage Helper =====
const Storage = {
    get(key, fallback = null) {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : fallback;
        } catch { return fallback; }
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

// ===== Main Application =====
const App = {
    currentPage: 'dashboard',

    init() {
        this.loadTheme();
        this.setupNavigation();
        this.setupDate();
        this.renderDashboard();
        this.renderExercises();
        this.renderWorkoutTemplates();
        this.renderSavedWorkouts();
        this.setupExerciseSearch();
        this.setupExerciseFilters();
        this.setupWorkoutBuilder();
        this.setupTimer();
        this.setupProfile();
        this.renderProgress();
        this.renderAchievements();
    },

    // ===== Navigation =====
    setupNavigation() {
        // Sidebar nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => this.navigateTo(item.dataset.page));
        });

        // Bottom nav
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', () => this.navigateTo(item.dataset.page));
        });

        // Menu toggle
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Close sidebar on page click (mobile)
        document.querySelector('.main-content').addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
        });
    },

    navigateTo(page) {
        this.currentPage = page;

        // Update active nav items
        document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.page === page);
        });

        // Show correct page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById(`page-${page}`);
        if (pageEl) pageEl.classList.add('active');

        // Update title
        document.getElementById('pageTitle').textContent = PAGE_TITLES[page] || page;

        // Refresh data on page switch
        if (page === 'dashboard') this.renderDashboard();
        if (page === 'progress') this.renderProgress();
    },

    setupDate() {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('ru-RU', options);
    },

    // ===== Theme =====
    loadTheme() {
        const dark = Storage.get('darkMode', false);
        if (dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) toggle.checked = dark;

        toggle?.addEventListener('change', () => {
            const isDark = toggle.checked;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
            Storage.set('darkMode', isDark);
        });
    },

    // ===== Dashboard =====
    renderDashboard() {
        const history = Storage.get('workoutHistory', []);
        const stats = this.calculateStats(history);

        document.getElementById('totalWorkouts').textContent = stats.totalWorkouts;
        document.getElementById('totalMinutes').textContent = stats.totalMinutes;
        document.getElementById('totalCalories').textContent = stats.totalCalories;
        document.getElementById('currentStreak').textContent = stats.streak;

        this.renderWeeklyChart(history);
        this.renderTodayPlan();
        this.renderRecentWorkouts(history);
    },

    calculateStats(history) {
        const totalWorkouts = history.length;
        const totalMinutes = history.reduce((sum, w) => sum + (w.duration || 0), 0);
        const totalCalories = history.reduce((sum, w) => sum + (w.calories || 0), 0);
        const streak = this.calculateStreak(history);
        return { totalWorkouts, totalMinutes, totalCalories, streak };
    },

    calculateStreak(history) {
        if (history.length === 0) return 0;

        const dates = [...new Set(history.map(w => w.date))].sort().reverse();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (dates[0] !== today && dates[0] !== yesterday) return 0;

        let streak = 1;
        for (let i = 1; i < dates.length; i++) {
            const prev = new Date(dates[i - 1]);
            const curr = new Date(dates[i]);
            const diff = (prev - curr) / 86400000;
            if (diff === 1) streak++;
            else break;
        }
        return streak;
    },

    renderWeeklyChart(history) {
        const container = document.getElementById('weeklyChart');
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const today = new Date();
        const dayOfWeek = (today.getDay() + 6) % 7; // Monday = 0

        // Get last 7 days data
        const weekData = days.map((_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - dayOfWeek + i);
            const dateStr = date.toISOString().split('T')[0];
            const dayWorkouts = history.filter(w => w.date === dateStr);
            return dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
        });

        const maxVal = Math.max(...weekData, 1);

        container.innerHTML = weekData.map((val, i) => `
            <div class="chart-bar-wrap">
                <span class="chart-value">${val > 0 ? val + 'м' : ''}</span>
                <div class="chart-bar ${i === dayOfWeek ? 'today' : ''}" style="height: ${Math.max((val / maxVal) * 160, 4)}px"></div>
                <span class="chart-label">${days[i]}</span>
            </div>
        `).join('');
    },

    renderTodayPlan() {
        const container = document.getElementById('todayPlan');
        const savedWorkouts = Storage.get('savedWorkouts', []);
        const history = Storage.get('workoutHistory', []);
        const today = new Date().toISOString().split('T')[0];
        const todayDone = history.some(w => w.date === today);

        if (todayDone) {
            container.innerHTML = '<p class="empty-state" style="color: var(--success);">&#10003; Тренировка выполнена!</p>';
        } else if (savedWorkouts.length > 0) {
            const next = savedWorkouts[0];
            const exercises = next.exercises.map(e => {
                const ex = EXERCISES.find(ex => ex.id === e.exerciseId);
                return `<div class="today-exercise"><span class="today-dot"></span><span>${ex ? ex.name : 'Упражнение'}</span></div>`;
            }).join('');
            container.innerHTML = `<h4 style="margin-bottom:8px">${next.name}</h4>${exercises}`;
        } else {
            container.innerHTML = '<p class="empty-state">Нет запланированных тренировок</p>';
        }
    },

    renderRecentWorkouts(history) {
        const container = document.getElementById('recentWorkouts');
        if (history.length === 0) {
            container.innerHTML = '<p class="empty-state">История пуста</p>';
            return;
        }

        const recent = history.slice(-5).reverse();
        container.innerHTML = recent.map(w => {
            const date = new Date(w.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${w.name}</h4>
                        <span>${date}</span>
                    </div>
                    <div class="history-stats">
                        <div class="duration">${w.duration} мин</div>
                        <div class="exercises-count">${w.exerciseCount || 0} упражнений</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // ===== Exercises =====
    renderExercises(filter = 'all', search = '') {
        const container = document.getElementById('exercisesList');
        let filtered = EXERCISES;

        if (filter !== 'all') {
            filtered = filtered.filter(e => e.muscle === filter);
        }

        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(e =>
                e.name.toLowerCase().includes(q) ||
                e.description.toLowerCase().includes(q) ||
                e.equipment.toLowerCase().includes(q)
            );
        }

        container.innerHTML = filtered.map(e => `
            <div class="exercise-card" data-muscle="${e.muscle}">
                <h4>${e.name}</h4>
                <p style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">${e.description}</p>
                <div class="exercise-meta">
                    <span>${e.equipment}</span>
                </div>
                <span class="exercise-tag">${MUSCLE_LABELS[e.muscle]}</span>
            </div>
        `).join('');
    },

    setupExerciseSearch() {
        const input = document.getElementById('exerciseSearch');
        input.addEventListener('input', () => {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            this.renderExercises(activeFilter, input.value);
        });
    },

    setupExerciseFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const search = document.getElementById('exerciseSearch').value;
                this.renderExercises(btn.dataset.filter, search);
            });
        });
    },

    // ===== Workouts =====
    renderWorkoutTemplates() {
        const container = document.getElementById('workoutTemplates');
        container.innerHTML = WORKOUT_TEMPLATES.map(t => `
            <div class="template-card" data-template="${t.id}">
                <div class="template-icon">${t.icon}</div>
                <h4>${t.name}</h4>
                <p>${t.description}</p>
            </div>
        `).join('');

        container.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const template = WORKOUT_TEMPLATES.find(t => t.id === card.dataset.template);
                if (template) this.startWorkout(template);
            });
        });
    },

    renderSavedWorkouts() {
        const container = document.getElementById('savedWorkouts');
        const saved = Storage.get('savedWorkouts', []);

        if (saved.length === 0) {
            container.innerHTML = '<p class="empty-state">Нет сохраненных тренировок</p>';
            return;
        }

        container.innerHTML = saved.map((w, i) => `
            <div class="saved-workout-item">
                <div class="saved-workout-info">
                    <h4>${w.name}</h4>
                    <p>${w.exercises.length} упражнений</p>
                </div>
                <div class="saved-workout-actions">
                    <button class="btn btn-primary btn-sm" onclick="App.startWorkoutFromSaved(${i})">Начать</button>
                    <button class="btn btn-danger btn-sm" onclick="App.deleteSavedWorkout(${i})">&#10005;</button>
                </div>
            </div>
        `).join('');
    },

    deleteSavedWorkout(index) {
        const saved = Storage.get('savedWorkouts', []);
        saved.splice(index, 1);
        Storage.set('savedWorkouts', saved);
        this.renderSavedWorkouts();
        this.showToast('Тренировка удалена');
    },

    startWorkoutFromSaved(index) {
        const saved = Storage.get('savedWorkouts', []);
        if (saved[index]) this.startWorkout(saved[index]);
    },

    // ===== Workout Builder =====
    setupWorkoutBuilder() {
        this.builderExercises = [];

        document.getElementById('createWorkoutBtn').addEventListener('click', () => {
            this.builderExercises = [];
            document.getElementById('workoutName').value = '';
            this.renderBuilderExercises();
            document.getElementById('workoutModal').classList.add('active');
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('workoutModal').classList.remove('active');
        });

        document.getElementById('cancelWorkout').addEventListener('click', () => {
            document.getElementById('workoutModal').classList.remove('active');
        });

        document.getElementById('addExerciseBtn').addEventListener('click', () => {
            this.openExercisePicker();
        });

        document.getElementById('closePickerModal').addEventListener('click', () => {
            document.getElementById('exercisePickerModal').classList.remove('active');
        });

        document.getElementById('saveWorkout').addEventListener('click', () => {
            this.saveWorkout();
        });
    },

    openExercisePicker() {
        const modal = document.getElementById('exercisePickerModal');
        const list = document.getElementById('pickerList');
        const search = document.getElementById('pickerSearch');

        const renderList = (query = '') => {
            let exercises = EXERCISES;
            if (query) {
                const q = query.toLowerCase();
                exercises = exercises.filter(e => e.name.toLowerCase().includes(q));
            }
            list.innerHTML = exercises.map(e => `
                <div class="picker-item" data-id="${e.id}">
                    <h4>${e.name}</h4>
                    <span>${MUSCLE_LABELS[e.muscle]} | ${e.equipment}</span>
                </div>
            `).join('');

            list.querySelectorAll('.picker-item').forEach(item => {
                item.addEventListener('click', () => {
                    const exercise = EXERCISES.find(e => e.id === parseInt(item.dataset.id));
                    if (exercise) {
                        this.builderExercises.push({
                            exerciseId: exercise.id,
                            sets: [{ reps: 10, weight: 0 }]
                        });
                        this.renderBuilderExercises();
                        modal.classList.remove('active');
                    }
                });
            });
        };

        search.value = '';
        renderList();
        search.addEventListener('input', () => renderList(search.value));
        modal.classList.add('active');
    },

    renderBuilderExercises() {
        const container = document.getElementById('workoutExercises');
        container.innerHTML = this.builderExercises.map((item, exIdx) => {
            const exercise = EXERCISES.find(e => e.id === item.exerciseId);
            const setsHtml = item.sets.map((set, setIdx) => `
                <tr>
                    <td>${setIdx + 1}</td>
                    <td><input type="number" value="${set.reps}" min="1" onchange="App.updateBuilderSet(${exIdx}, ${setIdx}, 'reps', this.value)"></td>
                    <td><input type="number" value="${set.weight}" min="0" step="0.5" onchange="App.updateBuilderSet(${exIdx}, ${setIdx}, 'weight', this.value)"></td>
                </tr>
            `).join('');

            return `
                <div class="workout-exercise-item">
                    <div class="workout-exercise-header">
                        <h4>${exercise ? exercise.name : 'Упражнение'}</h4>
                        <button class="remove-exercise" onclick="App.removeBuilderExercise(${exIdx})">&times;</button>
                    </div>
                    <table class="sets-table">
                        <thead><tr><th>#</th><th>Повторы</th><th>Вес (кг)</th></tr></thead>
                        <tbody>${setsHtml}</tbody>
                    </table>
                    <button class="add-set-btn" onclick="App.addBuilderSet(${exIdx})">+ Добавить подход</button>
                </div>
            `;
        }).join('');
    },

    updateBuilderSet(exIdx, setIdx, field, value) {
        this.builderExercises[exIdx].sets[setIdx][field] = parseFloat(value) || 0;
    },

    addBuilderSet(exIdx) {
        const lastSet = this.builderExercises[exIdx].sets.at(-1) || { reps: 10, weight: 0 };
        this.builderExercises[exIdx].sets.push({ ...lastSet });
        this.renderBuilderExercises();
    },

    removeBuilderExercise(exIdx) {
        this.builderExercises.splice(exIdx, 1);
        this.renderBuilderExercises();
    },

    saveWorkout() {
        const name = document.getElementById('workoutName').value.trim();
        if (!name) {
            this.showToast('Введите название тренировки');
            return;
        }
        if (this.builderExercises.length === 0) {
            this.showToast('Добавьте хотя бы одно упражнение');
            return;
        }

        const saved = Storage.get('savedWorkouts', []);
        saved.push({
            name,
            exercises: JSON.parse(JSON.stringify(this.builderExercises)),
            createdAt: new Date().toISOString()
        });
        Storage.set('savedWorkouts', saved);

        document.getElementById('workoutModal').classList.remove('active');
        this.renderSavedWorkouts();
        this.showToast('Тренировка сохранена!');
    },

    // ===== Active Workout =====
    activeWorkoutTimer: null,
    activeWorkoutStart: null,

    startWorkout(workout) {
        const view = document.getElementById('activeWorkout');
        document.getElementById('activeWorkoutName').textContent = workout.name;
        view.classList.remove('hidden');

        this.activeWorkoutStart = Date.now();
        this.activeWorkoutData = JSON.parse(JSON.stringify(workout));

        // Render exercises
        const container = document.getElementById('activeExercises');
        container.innerHTML = workout.exercises.map((item, exIdx) => {
            const exercise = EXERCISES.find(e => e.id === item.exerciseId);
            const setsHtml = item.sets.map((set, setIdx) => `
                <div class="set-row" data-ex="${exIdx}" data-set="${setIdx}">
                    <span class="set-number">${setIdx + 1}</span>
                    <div>
                        <input type="number" value="${set.weight}" min="0" step="0.5"
                               onchange="App.activeWorkoutData.exercises[${exIdx}].sets[${setIdx}].weight = parseFloat(this.value) || 0">
                        <label>кг</label>
                    </div>
                    <div>
                        <input type="number" value="${set.reps}" min="0"
                               onchange="App.activeWorkoutData.exercises[${exIdx}].sets[${setIdx}].reps = parseInt(this.value) || 0">
                        <label>повт.</label>
                    </div>
                    <button class="set-check" onclick="this.classList.toggle('done')">&#10003;</button>
                </div>
            `).join('');

            return `
                <div class="active-exercise-block">
                    <h4>${exercise ? exercise.name : 'Упражнение'}</h4>
                    ${setsHtml}
                </div>
            `;
        }).join('');

        // Timer
        this.activeWorkoutTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.activeWorkoutStart) / 1000);
            const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const secs = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('workoutDuration').textContent = `${mins}:${secs}`;
        }, 1000);

        document.getElementById('cancelActiveWorkout').onclick = () => {
            clearInterval(this.activeWorkoutTimer);
            view.classList.add('hidden');
        };

        document.getElementById('finishWorkout').onclick = () => this.finishWorkout();
    },

    finishWorkout() {
        clearInterval(this.activeWorkoutTimer);
        const duration = Math.round((Date.now() - this.activeWorkoutStart) / 60000);

        // Estimate calories (~5 cal per minute of training)
        const calories = Math.round(duration * 5);

        const record = {
            name: this.activeWorkoutData.name,
            date: new Date().toISOString().split('T')[0],
            duration: Math.max(duration, 1),
            calories,
            exerciseCount: this.activeWorkoutData.exercises.length,
            exercises: this.activeWorkoutData.exercises,
            timestamp: Date.now()
        };

        const history = Storage.get('workoutHistory', []);
        history.push(record);
        Storage.set('workoutHistory', history);

        document.getElementById('activeWorkout').classList.add('hidden');
        this.showToast(`Тренировка завершена! ${duration} мин, ~${calories} ккал`);
        this.renderDashboard();
        this.renderSavedWorkouts();
    },

    // ===== Timer =====
    timerInterval: null,
    timerSeconds: 90,
    timerRemaining: 90,
    timerRunning: false,
    tabataMode: false,

    setupTimer() {
        const display = document.getElementById('timerDisplay');
        const progress = document.getElementById('timerProgress');
        const startBtn = document.getElementById('timerStart');
        const pauseBtn = document.getElementById('timerPause');
        const resetBtn = document.getElementById('timerReset');

        // Presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.timerSeconds = parseInt(btn.dataset.seconds);
                this.timerRemaining = this.timerSeconds;
                this.updateTimerDisplay();
                this.tabataMode = false;
            });
        });

        startBtn.addEventListener('click', () => {
            if (this.tabataMode) return;
            this.startTimer();
        });

        pauseBtn.addEventListener('click', () => this.pauseTimer());
        resetBtn.addEventListener('click', () => this.resetTimer());

        // Tabata
        document.getElementById('startTabata').addEventListener('click', () => this.startTabata());

        ['tabataWork', 'tabataRest', 'tabataRounds'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.updateTabataInfo());
        });

        this.updateTimerDisplay();
        this.updateTabataInfo();
    },

    updateTimerDisplay() {
        const mins = Math.floor(this.timerRemaining / 60).toString().padStart(2, '0');
        const secs = (this.timerRemaining % 60).toString().padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${mins}:${secs}`;

        const circumference = 2 * Math.PI * 90;
        const offset = circumference * (1 - this.timerRemaining / this.timerSeconds);
        document.getElementById('timerProgress').style.strokeDashoffset = offset;
    },

    startTimer() {
        if (this.timerRunning) return;
        this.timerRunning = true;
        document.getElementById('timerStart').classList.add('hidden');
        document.getElementById('timerPause').classList.remove('hidden');

        this.timerInterval = setInterval(() => {
            this.timerRemaining--;
            this.updateTimerDisplay();

            if (this.timerRemaining <= 0) {
                this.timerComplete();
            }
        }, 1000);
    },

    pauseTimer() {
        this.timerRunning = false;
        clearInterval(this.timerInterval);
        document.getElementById('timerStart').classList.remove('hidden');
        document.getElementById('timerPause').classList.add('hidden');
    },

    resetTimer() {
        this.pauseTimer();
        this.timerRemaining = this.timerSeconds;
        this.tabataMode = false;
        document.getElementById('timerProgress').classList.remove('rest');
        const phaseEl = document.querySelector('.timer-phase');
        if (phaseEl) phaseEl.remove();
        this.updateTimerDisplay();
    },

    timerComplete() {
        this.pauseTimer();
        this.playBeep();
        this.timerRemaining = 0;
        this.updateTimerDisplay();
        this.showToast('Время вышло!');
    },

    playBeep() {
        if (!Storage.get('timerSound', true)) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            gain.gain.value = 0.3;
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
            setTimeout(() => {
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.frequency.value = 1000;
                gain2.gain.value = 0.3;
                osc2.start();
                osc2.stop(ctx.currentTime + 0.3);
            }, 250);
        } catch { /* audio not available */ }
    },

    // Tabata
    updateTabataInfo() {
        const work = parseInt(document.getElementById('tabataWork').value) || 20;
        const rest = parseInt(document.getElementById('tabataRest').value) || 10;
        const rounds = parseInt(document.getElementById('tabataRounds').value) || 8;
        const total = (work + rest) * rounds;
        const mins = Math.floor(total / 60);
        const secs = total % 60;
        document.getElementById('tabataInfo').textContent = `Всего: ${mins}:${secs.toString().padStart(2, '0')}`;
    },

    startTabata() {
        const work = parseInt(document.getElementById('tabataWork').value) || 20;
        const rest = parseInt(document.getElementById('tabataRest').value) || 10;
        const rounds = parseInt(document.getElementById('tabataRounds').value) || 8;

        this.tabataMode = true;
        let currentRound = 1;
        let isWork = true;

        // Add phase display
        let phaseEl = document.querySelector('.timer-phase');
        if (!phaseEl) {
            phaseEl = document.createElement('div');
            phaseEl.className = 'timer-phase';
            document.querySelector('.timer-display').after(phaseEl);
        }

        const runPhase = () => {
            if (currentRound > rounds) {
                this.resetTimer();
                this.showToast('Табата завершена!');
                phaseEl.remove();
                return;
            }

            this.timerSeconds = isWork ? work : rest;
            this.timerRemaining = this.timerSeconds;
            phaseEl.textContent = isWork ? `Раунд ${currentRound}/${rounds} — РАБОТА` : `Раунд ${currentRound}/${rounds} — ОТДЫХ`;

            const progressEl = document.getElementById('timerProgress');
            if (isWork) {
                progressEl.classList.remove('rest');
            } else {
                progressEl.classList.add('rest');
            }

            this.updateTimerDisplay();

            this.timerRunning = true;
            document.getElementById('timerStart').classList.add('hidden');
            document.getElementById('timerPause').classList.remove('hidden');

            this.timerInterval = setInterval(() => {
                this.timerRemaining--;
                this.updateTimerDisplay();

                if (this.timerRemaining <= 0) {
                    clearInterval(this.timerInterval);
                    this.timerRunning = false;
                    this.playBeep();

                    if (isWork) {
                        isWork = false;
                    } else {
                        isWork = true;
                        currentRound++;
                    }
                    setTimeout(runPhase, 500);
                }
            }, 1000);
        };

        runPhase();
    },

    // ===== Progress =====
    renderProgress() {
        const history = Storage.get('workoutHistory', []);
        this.renderVolumeChart(history);
        this.renderMuscleChart(history);
        this.renderPersonalRecords(history);
        this.renderAchievements();

        // Period buttons
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Re-render with filter (simplified — shows all data)
                this.renderVolumeChart(history);
            });
        });
    },

    renderVolumeChart(history) {
        const container = document.getElementById('volumeChart');
        if (history.length === 0) {
            container.innerHTML = '<p class="empty-state">Нет данных</p>';
            container.style.height = 'auto';
            return;
        }

        // Group by date, show last 7 entries
        const grouped = {};
        history.forEach(w => {
            if (!grouped[w.date]) grouped[w.date] = 0;
            grouped[w.date] += w.duration || 0;
        });

        const entries = Object.entries(grouped).sort().slice(-7);
        const maxVal = Math.max(...entries.map(e => e[1]), 1);

        container.innerHTML = entries.map(([date, val]) => {
            const d = new Date(date);
            const label = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            return `
                <div class="chart-bar-wrap">
                    <span class="chart-value">${val}м</span>
                    <div class="chart-bar" style="height: ${Math.max((val / maxVal) * 160, 4)}px"></div>
                    <span class="chart-label">${label}</span>
                </div>
            `;
        }).join('');
    },

    renderMuscleChart(history) {
        const container = document.getElementById('muscleChart');
        const muscleCount = {};

        history.forEach(w => {
            (w.exercises || []).forEach(ex => {
                const exercise = EXERCISES.find(e => e.id === ex.exerciseId);
                if (exercise) {
                    muscleCount[exercise.muscle] = (muscleCount[exercise.muscle] || 0) + 1;
                }
            });
        });

        if (Object.keys(muscleCount).length === 0) {
            container.innerHTML = '<p class="empty-state">Нет данных</p>';
            return;
        }

        const maxCount = Math.max(...Object.values(muscleCount), 1);

        container.innerHTML = Object.entries(MUSCLE_LABELS).map(([key, label]) => {
            const count = muscleCount[key] || 0;
            const pct = (count / maxCount) * 100;
            return `
                <div class="muscle-bar-wrap">
                    <span class="muscle-bar-label">${label}</span>
                    <div class="muscle-bar-track">
                        <div class="muscle-bar-fill" style="width: ${pct}%; background: ${MUSCLE_COLORS[key]}"></div>
                    </div>
                    <span class="muscle-bar-value">${count}</span>
                </div>
            `;
        }).join('');
    },

    renderPersonalRecords(history) {
        const container = document.getElementById('personalRecords');
        const records = {};

        history.forEach(w => {
            (w.exercises || []).forEach(ex => {
                const exercise = EXERCISES.find(e => e.id === ex.exerciseId);
                if (!exercise) return;

                ex.sets.forEach(set => {
                    if (set.weight > 0) {
                        if (!records[exercise.name] || set.weight > records[exercise.name]) {
                            records[exercise.name] = set.weight;
                        }
                    }
                });
            });
        });

        if (Object.keys(records).length === 0) {
            container.innerHTML = '<p class="empty-state">Начните тренироваться для отслеживания рекордов</p>';
            return;
        }

        container.innerHTML = Object.entries(records)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, weight]) => `
                <div class="record-item">
                    <span class="record-name">${name}</span>
                    <span class="record-value">${weight} кг</span>
                </div>
            `).join('');
    },

    renderAchievements() {
        const container = document.getElementById('achievements');
        const history = Storage.get('workoutHistory', []);
        const stats = this.calculateStats(history);

        container.innerHTML = ACHIEVEMENTS.map(a => {
            const unlocked = a.condition(stats);
            return `
                <div class="achievement ${unlocked ? 'unlocked' : ''}">
                    <div class="achievement-icon">${a.icon}</div>
                    <div class="achievement-name">${a.name}</div>
                </div>
            `;
        }).join('');
    },

    // ===== Profile =====
    setupProfile() {
        const profile = Storage.get('profile', {});
        if (profile.name) document.getElementById('profileName').value = profile.name;
        if (profile.age) document.getElementById('profileAge').value = profile.age;
        if (profile.weight) document.getElementById('profileWeight').value = profile.weight;
        if (profile.height) document.getElementById('profileHeight').value = profile.height;
        if (profile.goal) document.getElementById('profileGoal').value = profile.goal;

        document.getElementById('saveProfile').addEventListener('click', () => {
            const data = {
                name: document.getElementById('profileName').value.trim(),
                age: parseInt(document.getElementById('profileAge').value) || null,
                weight: parseFloat(document.getElementById('profileWeight').value) || null,
                height: parseInt(document.getElementById('profileHeight').value) || null,
                goal: document.getElementById('profileGoal').value
            };
            Storage.set('profile', data);
            this.showToast('Профиль сохранен!');
        });

        // Timer sound toggle
        const timerSound = document.getElementById('timerSoundToggle');
        timerSound.checked = Storage.get('timerSound', true);
        timerSound.addEventListener('change', () => {
            Storage.set('timerSound', timerSound.checked);
        });

        // Export data
        document.getElementById('exportData').addEventListener('click', () => {
            const data = {
                profile: Storage.get('profile', {}),
                workoutHistory: Storage.get('workoutHistory', []),
                savedWorkouts: Storage.get('savedWorkouts', [])
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fittrack-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            this.showToast('Данные экспортированы!');
        });

        // Clear data
        document.getElementById('clearData').addEventListener('click', () => {
            if (confirm('Вы уверены? Все данные будут удалены безвозвратно.')) {
                Storage.remove('workoutHistory');
                Storage.remove('savedWorkouts');
                Storage.remove('profile');
                this.renderDashboard();
                this.renderSavedWorkouts();
                this.renderProgress();
                this.showToast('Все данные удалены');
            }
        });
    },

    // ===== Toast =====
    showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
    }
};

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => App.init());
