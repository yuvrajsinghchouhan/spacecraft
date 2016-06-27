'use strict';

// Зависимсоти
var BBotText = require('../../bot-text');

module.exports = Comments();

/**
 * Урок - 'Комментарии'.
 *
 * Created by vladthelittleone on 02.12.15.
 */
function Comments() {

	return {
		title:        'Комментарии',
		content:      function () {

			return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, перейдем к следующей части урока.</p>' +
				'<p>Вы наверно уже заметили, что текст, который начинается с <span class="under-label">//</span>, является комментарием и преднзаначен для человека.</p>' +
				'<p>Комментарии делают код более понятным для вас и вашей команды. Поэтому, если вдруг корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>' +
				'<p><strong>JavaScript</strong> поддерживает два типа комментариев: однострочные и многострочныe.</p>';

		},
		// BBot - проказник, не позорься!
		// Нужно понизить его уровень юмора, а то этот Джордж Карлин переходит все границы.
		// Закомментируйте кусок кода на строке 8 и 9, пока никто не видет.
		instructions: '<ul>' +
					  '<li>Закомментируйте кусок кода в строке <strong>8</strong> и <strong>9</strong>.</li>' +
					  '<li>Для самостоятельного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Комментарии">клац</a>.</li>' +
					  '</ul>',
		character:    [{
			audio:  'audio/lesson1/3.mp3',
			css:    'astrogirl-img',
			hint:   [
				{
					'next .ace_scroller': 'Редактор кода',
					'nextButton':         {text: 'Далее'},
					'showSkip':           false
				}
			],
			marker: {
				x1:   6,
				y2:   Infinity,
				type: 'line'
			}
		}],
		interpreterHandler:  function (value) {

			var botText = BBotText({

				correct: '<p>Что-т0 преднозначенное для человека! Комментарии?</p>',

				unknownError: '<p>Эй, BBot не хочет уничтожать человекорасу! Наверно...</p>' +
							  '<p>Похоже вы забыли поставитb //.</p>'

			});

			// При комментировании результат будет возвращен ввиде 'undefined'
			return botText.result(!value);
		}
	};
}