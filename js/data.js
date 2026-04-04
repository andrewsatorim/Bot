// ===== Exercise Database =====
const EXERCISES = [
    // Грудь
    { id: 1, name: 'Жим штанги лёжа', muscle: 'chest', equipment: 'Штанга', type: 'strength', description: 'Базовое упражнение для грудных мышц' },
    { id: 2, name: 'Жим гантелей лёжа', muscle: 'chest', equipment: 'Гантели', type: 'strength', description: 'Жим с большей амплитудой' },
    { id: 3, name: 'Разводка гантелей', muscle: 'chest', equipment: 'Гантели', type: 'strength', description: 'Изолирующее упражнение для груди' },
    { id: 4, name: 'Отжимания', muscle: 'chest', equipment: 'Свой вес', type: 'strength', description: 'Классическое упражнение с собственным весом' },
    { id: 5, name: 'Отжимания на брусьях', muscle: 'chest', equipment: 'Брусья', type: 'strength', description: 'Отжимания с акцентом на нижнюю часть груди' },
    { id: 6, name: 'Жим в наклоне', muscle: 'chest', equipment: 'Штанга', type: 'strength', description: 'Акцент на верхнюю часть груди' },

    // Спина
    { id: 7, name: 'Подтягивания', muscle: 'back', equipment: 'Турник', type: 'strength', description: 'Базовое упражнение для широчайших' },
    { id: 8, name: 'Тяга штанги в наклоне', muscle: 'back', equipment: 'Штанга', type: 'strength', description: 'Развитие толщины спины' },
    { id: 9, name: 'Тяга гантели одной рукой', muscle: 'back', equipment: 'Гантели', type: 'strength', description: 'Односторонняя тяга для спины' },
    { id: 10, name: 'Тяга верхнего блока', muscle: 'back', equipment: 'Тренажёр', type: 'strength', description: 'Альтернатива подтягиваниям' },
    { id: 11, name: 'Становая тяга', muscle: 'back', equipment: 'Штанга', type: 'strength', description: 'Базовое многосуставное упражнение' },
    { id: 12, name: 'Гиперэкстензия', muscle: 'back', equipment: 'Тренажёр', type: 'strength', description: 'Укрепление поясницы' },

    // Ноги
    { id: 13, name: 'Приседания со штангой', muscle: 'legs', equipment: 'Штанга', type: 'strength', description: 'Базовое упражнение для ног' },
    { id: 14, name: 'Жим ногами', muscle: 'legs', equipment: 'Тренажёр', type: 'strength', description: 'Безопасная альтернатива приседаниям' },
    { id: 15, name: 'Выпады с гантелями', muscle: 'legs', equipment: 'Гантели', type: 'strength', description: 'Развитие баланса и силы ног' },
    { id: 16, name: 'Разгибание ног', muscle: 'legs', equipment: 'Тренажёр', type: 'strength', description: 'Изоляция квадрицепса' },
    { id: 17, name: 'Сгибание ног', muscle: 'legs', equipment: 'Тренажёр', type: 'strength', description: 'Изоляция бицепса бедра' },
    { id: 18, name: 'Подъёмы на носки', muscle: 'legs', equipment: 'Тренажёр', type: 'strength', description: 'Развитие икроножных мышц' },

    // Плечи
    { id: 19, name: 'Жим штанги стоя', muscle: 'shoulders', equipment: 'Штанга', type: 'strength', description: 'Армейский жим' },
    { id: 20, name: 'Жим гантелей сидя', muscle: 'shoulders', equipment: 'Гантели', type: 'strength', description: 'Жим на плечи с гантелями' },
    { id: 21, name: 'Разведение гантелей в стороны', muscle: 'shoulders', equipment: 'Гантели', type: 'strength', description: 'Изоляция средней дельты' },
    { id: 22, name: 'Тяга штанги к подбородку', muscle: 'shoulders', equipment: 'Штанга', type: 'strength', description: 'Развитие дельтовидных мышц' },
    { id: 23, name: 'Разведение в наклоне', muscle: 'shoulders', equipment: 'Гантели', type: 'strength', description: 'Задние дельты' },

    // Руки
    { id: 24, name: 'Подъём штанги на бицепс', muscle: 'arms', equipment: 'Штанга', type: 'strength', description: 'Базовое упражнение для бицепса' },
    { id: 25, name: 'Подъём гантелей на бицепс', muscle: 'arms', equipment: 'Гантели', type: 'strength', description: 'Сгибания с супинацией' },
    { id: 26, name: 'Молотковые сгибания', muscle: 'arms', equipment: 'Гантели', type: 'strength', description: 'Развитие брахиалиса' },
    { id: 27, name: 'Французский жим', muscle: 'arms', equipment: 'Штанга', type: 'strength', description: 'Базовое упражнение для трицепса' },
    { id: 28, name: 'Разгибания на трицепс', muscle: 'arms', equipment: 'Блок', type: 'strength', description: 'Изоляция трицепса на блоке' },
    { id: 29, name: 'Отжимания узким хватом', muscle: 'arms', equipment: 'Свой вес', type: 'strength', description: 'Трицепс с собственным весом' },

    // Пресс
    { id: 30, name: 'Скручивания', muscle: 'core', equipment: 'Свой вес', type: 'strength', description: 'Классическое упражнение на пресс' },
    { id: 31, name: 'Планка', muscle: 'core', equipment: 'Свой вес', type: 'hold', description: 'Статическое удержание корпуса' },
    { id: 32, name: 'Подъём ног в висе', muscle: 'core', equipment: 'Турник', type: 'strength', description: 'Нижний пресс' },
    { id: 33, name: 'Велосипед', muscle: 'core', equipment: 'Свой вес', type: 'strength', description: 'Косые мышцы живота' },
    { id: 34, name: 'Русский твист', muscle: 'core', equipment: 'Свой вес', type: 'strength', description: 'Ротация корпуса для косых мышц' },

    // Кардио
    { id: 35, name: 'Бег', muscle: 'cardio', equipment: 'Нет', type: 'cardio', description: 'Классическое кардио' },
    { id: 36, name: 'Велосипед/велотренажёр', muscle: 'cardio', equipment: 'Велотренажёр', type: 'cardio', description: 'Низкоударное кардио' },
    { id: 37, name: 'Скакалка', muscle: 'cardio', equipment: 'Скакалка', type: 'cardio', description: 'Интенсивное кардио' },
    { id: 38, name: 'Бёрпи', muscle: 'cardio', equipment: 'Свой вес', type: 'cardio', description: 'Функциональное кардио упражнение' },
    { id: 39, name: 'Гребной тренажёр', muscle: 'cardio', equipment: 'Тренажёр', type: 'cardio', description: 'Кардио + силовая нагрузка' },
];

// ===== Workout Templates =====
const WORKOUT_TEMPLATES = [
    {
        id: 'push',
        name: 'Push Day',
        icon: '&#128170;',
        description: 'Грудь, Плечи, Трицепс',
        exercises: [
            { exerciseId: 1, sets: [{ reps: 10, weight: 60 }, { reps: 8, weight: 70 }, { reps: 6, weight: 80 }, { reps: 6, weight: 80 }] },
            { exerciseId: 6, sets: [{ reps: 10, weight: 50 }, { reps: 8, weight: 55 }, { reps: 8, weight: 55 }] },
            { exerciseId: 19, sets: [{ reps: 10, weight: 40 }, { reps: 8, weight: 45 }, { reps: 8, weight: 45 }] },
            { exerciseId: 21, sets: [{ reps: 12, weight: 10 }, { reps: 12, weight: 10 }, { reps: 12, weight: 10 }] },
            { exerciseId: 27, sets: [{ reps: 10, weight: 30 }, { reps: 10, weight: 30 }, { reps: 10, weight: 30 }] },
        ]
    },
    {
        id: 'pull',
        name: 'Pull Day',
        icon: '&#129470;',
        description: 'Спина, Бицепс',
        exercises: [
            { exerciseId: 7, sets: [{ reps: 10, weight: 0 }, { reps: 8, weight: 0 }, { reps: 6, weight: 0 }] },
            { exerciseId: 8, sets: [{ reps: 10, weight: 60 }, { reps: 8, weight: 70 }, { reps: 8, weight: 70 }] },
            { exerciseId: 10, sets: [{ reps: 12, weight: 50 }, { reps: 10, weight: 55 }, { reps: 10, weight: 55 }] },
            { exerciseId: 24, sets: [{ reps: 12, weight: 30 }, { reps: 10, weight: 35 }, { reps: 10, weight: 35 }] },
            { exerciseId: 26, sets: [{ reps: 12, weight: 14 }, { reps: 12, weight: 14 }, { reps: 12, weight: 14 }] },
        ]
    },
    {
        id: 'legs',
        name: 'Leg Day',
        icon: '&#129461;',
        description: 'Квадрицепс, Бицепс бедра, Икры',
        exercises: [
            { exerciseId: 13, sets: [{ reps: 10, weight: 80 }, { reps: 8, weight: 90 }, { reps: 6, weight: 100 }, { reps: 6, weight: 100 }] },
            { exerciseId: 14, sets: [{ reps: 12, weight: 120 }, { reps: 10, weight: 140 }, { reps: 10, weight: 140 }] },
            { exerciseId: 15, sets: [{ reps: 12, weight: 20 }, { reps: 10, weight: 24 }, { reps: 10, weight: 24 }] },
            { exerciseId: 17, sets: [{ reps: 12, weight: 40 }, { reps: 12, weight: 40 }, { reps: 12, weight: 40 }] },
            { exerciseId: 18, sets: [{ reps: 15, weight: 60 }, { reps: 15, weight: 60 }, { reps: 15, weight: 60 }] },
        ]
    },
    {
        id: 'fullbody',
        name: 'Full Body',
        icon: '&#127947;',
        description: 'Все группы мышц',
        exercises: [
            { exerciseId: 1, sets: [{ reps: 8, weight: 60 }, { reps: 8, weight: 60 }, { reps: 8, weight: 60 }] },
            { exerciseId: 7, sets: [{ reps: 8, weight: 0 }, { reps: 8, weight: 0 }, { reps: 8, weight: 0 }] },
            { exerciseId: 13, sets: [{ reps: 8, weight: 70 }, { reps: 8, weight: 70 }, { reps: 8, weight: 70 }] },
            { exerciseId: 19, sets: [{ reps: 10, weight: 35 }, { reps: 10, weight: 35 }, { reps: 10, weight: 35 }] },
            { exerciseId: 31, sets: [{ reps: 60, weight: 0 }, { reps: 60, weight: 0 }] },
        ]
    },
    {
        id: 'cardio',
        name: 'Кардио',
        icon: '&#10084;',
        description: 'Высокоинтенсивное кардио',
        exercises: [
            { exerciseId: 35, sets: [{ reps: 1, weight: 0 }] },
            { exerciseId: 38, sets: [{ reps: 15, weight: 0 }, { reps: 15, weight: 0 }, { reps: 15, weight: 0 }] },
            { exerciseId: 37, sets: [{ reps: 1, weight: 0 }, { reps: 1, weight: 0 }, { reps: 1, weight: 0 }] },
            { exerciseId: 30, sets: [{ reps: 20, weight: 0 }, { reps: 20, weight: 0 }] },
            { exerciseId: 31, sets: [{ reps: 45, weight: 0 }, { reps: 45, weight: 0 }] },
        ]
    },
    {
        id: 'core',
        name: 'Пресс',
        icon: '&#128293;',
        description: 'Мышцы кора и пресса',
        exercises: [
            { exerciseId: 30, sets: [{ reps: 20, weight: 0 }, { reps: 20, weight: 0 }, { reps: 20, weight: 0 }] },
            { exerciseId: 31, sets: [{ reps: 60, weight: 0 }, { reps: 60, weight: 0 }, { reps: 60, weight: 0 }] },
            { exerciseId: 32, sets: [{ reps: 15, weight: 0 }, { reps: 12, weight: 0 }, { reps: 10, weight: 0 }] },
            { exerciseId: 33, sets: [{ reps: 20, weight: 0 }, { reps: 20, weight: 0 }, { reps: 20, weight: 0 }] },
            { exerciseId: 34, sets: [{ reps: 20, weight: 10 }, { reps: 20, weight: 10 }, { reps: 20, weight: 10 }] },
        ]
    }
];

// ===== Achievements Definitions =====
const ACHIEVEMENTS = [
    { id: 'first_workout', name: 'Первый шаг', icon: '&#127941;', condition: (stats) => stats.totalWorkouts >= 1 },
    { id: 'five_workouts', name: '5 тренировок', icon: '&#11088;', condition: (stats) => stats.totalWorkouts >= 5 },
    { id: 'ten_workouts', name: '10 тренировок', icon: '&#127942;', condition: (stats) => stats.totalWorkouts >= 10 },
    { id: 'twenty_five', name: '25 тренировок', icon: '&#128081;', condition: (stats) => stats.totalWorkouts >= 25 },
    { id: 'fifty', name: '50 тренировок', icon: '&#128142;', condition: (stats) => stats.totalWorkouts >= 50 },
    { id: 'streak_3', name: '3 дня подряд', icon: '&#128293;', condition: (stats) => stats.streak >= 3 },
    { id: 'streak_7', name: 'Неделя подряд', icon: '&#9889;', condition: (stats) => stats.streak >= 7 },
    { id: 'streak_30', name: 'Месяц подряд', icon: '&#128171;', condition: (stats) => stats.streak >= 30 },
    { id: 'hour_total', name: '1 час всего', icon: '&#9201;', condition: (stats) => stats.totalMinutes >= 60 },
    { id: 'ten_hours', name: '10 часов всего', icon: '&#128337;', condition: (stats) => stats.totalMinutes >= 600 },
    { id: 'cal_1000', name: '1000 калорий', icon: '&#128165;', condition: (stats) => stats.totalCalories >= 1000 },
    { id: 'cal_10000', name: '10000 калорий', icon: '&#127774;', condition: (stats) => stats.totalCalories >= 10000 },
];

// ===== Muscle Group Labels =====
const MUSCLE_LABELS = {
    chest: 'Грудь',
    back: 'Спина',
    legs: 'Ноги',
    shoulders: 'Плечи',
    arms: 'Руки',
    core: 'Пресс',
    cardio: 'Кардио'
};

const MUSCLE_COLORS = {
    chest: '#E74C3C',
    back: '#3498DB',
    legs: '#2ECC71',
    shoulders: '#F39C12',
    arms: '#9B59B6',
    core: '#1ABC9C',
    cardio: '#E67E22'
};

const PAGE_TITLES = {
    dashboard: 'Главная',
    exercises: 'Упражнения',
    workouts: 'Тренировки',
    timer: 'Таймер',
    progress: 'Прогресс',
    profile: 'Профиль'
};
