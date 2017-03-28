'use strict';

// Экспорт
module.exports = Content();

/**
 * Created by vaimer on 15.02.2017.
 */

function Content() {

	var points = {
		// Изначальное число очков у игрока на уроке.
		totalPoints: 600,
		// Штрафные очки за действия на уроке.
		exception: 30,
		incorrectInput: 20
	};

	return {
		text:  'Пора узнать больше',
		label: 'Основы JavaScript',
		quote: 'В природе нет такой вещи, как свободная переменная.',
		rules: require('./autocomplete.json'),
		sub:   require('./sub'),
		isGameLesson: true,
		points: points,
		maxAttemptLessonCountForBonus: 4
	};

}
