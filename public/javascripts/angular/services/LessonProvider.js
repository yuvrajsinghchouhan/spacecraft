'use strict';

/**
 * Created by Ivan on 02.01.2016.
 */
var app = angular.module('spacecraft.lessonProvider', []);

app.service('lessonProvider', ['$storage', function ($storage)
{
	function isNumeric(n)
	{
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Local storage
	 */
	var st =
	{
		set: function(name, value)
		{
			$storage.local.setItem(name, value);
		},
		get: function(name)
		{
			return $storage.local.getItem(name);
		}
	};

	var BBotText = function (text)
	{
		var that = {};

		function result(status, message)
		{
			return {
				status: status,
				message: message
			};
		}

		function getText(value)
		{
			return text[value];
		}

		that.resultCorrect = function()
		{
			return result(true, getText('correct'));
		};

		that.unknownError = function()
		{
			return that.resultNotCorrect('unknownError');
		};

		that.resultNotCorrect = function(messageType)
		{
			return result(false, getText(messageType));
		};

		that.result = function(v)
		{
			if (v)
			{
				return that.resultCorrect();
			}

			return that.unknownError();
		};


		return that;
	};

	var lessons =
	[
		{
			text: 'Поступление в академию',
			label: 'Основы JavaScript',
			quote: 'Знания свет — путь укажет нам',
			startCode: '',
			sub:
			[
				{
					title: 'Добро пожаловать в академию!',
					defaultBBot: '<p>### Дройд BBot - инициализация...</p>' +
					'<p>### Настройка юм0ра на 75%</p>' +
					'<p>### Самоуничтожение через 10... 9... 8... 7...</p>',
					content: function ()
					{
						return '<p>Прежде, для управления космическим кораблем требовалась целая команда специалистов, однако это ' +
							'время прошло, теперь достаточно одного пилота-инженера.</p>' +
							'<p>Наша академия выпускает лучших пилотов во всей галактике, когда-нибудь и Вы, сможете стать одним из них.</p>' +
							'<p>Прежде чем начать обучение, необходимо уладить некоторые формальности.</p>'
					},
					instructions:
					'<ul>' +
					'<li>Справа находится редактор кода - это инструмент с помощью которого вы выполняете поставленные задачи.</li>' +
					'<li>Справа внизу находится робот - компаньон BBot. Он покажет ошибки и выведет всю необходимую информацию.</li>' +
					'<li>Нажмите "Далее" для продолжения.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Редактор кода',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .bbot-img': 'Bob Bot - ваш помощник',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .enjoy-hint-next': 'Нажмите для перехода к следующему уроку',
							'nextButton': false,
							'showSkip': false
						}
					]
				},
				{
					title: 'Ваше имя?',
					content: function ()
					{
						return '<p>Так, новенький, введите свое имя в редакторе кода - мне нужно найти вас в реестре новоиспеченных космических кадетов.</p>' +
						'<p>Высылаю вам инструкции по выполнению.</p>'
					},
					instructions:
					'<ul>' +
					'<li>Введите свое имя в кавычках, к примеру для меня код будет выглядеть так: <span class="red-label">«Джайна»</span>.</li>' +
					'<li>Для запуска кода нажмите, в правом верхнем углу, на зеленую кнопку <i class="glyphicon glyphicon-play green"></i>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите свое имя в кавычках',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода, а <i class="glyphicon glyphicon-stop red"></i> для вызова паузы',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Ура! BBot понял челвек0-имя, транслирую:</p>'
							+ '<p>' + value + '</p>',

							unknownError: '<p>### Упс! BBot не разобрал ваше человеческ0е имя!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>',

							noQuotes: '<p>### Упс! BBot не разобрал ваше человеческ0е имя!</p>' +
							'<p>Похоже вы забыли использоватb кавычки.</p>',

							isNumeric: '<p>### Упс! BBot полагает, что человеческ0е имя не может быть 4ислом!</p>' +
							'<p>Если вы робот или имперский шtурмовик, обратитесb в учебный с0вет академии.</p>',

							emptyInput: '<p>### Упс! BBot не получил ваше человеческ0е имя!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						if (value)
						{
							// Если нет " ", будет выброшено исключение
							if (value.exception)
							{
								return botText.resultNotCorrect('noQuotes');
							}

							// Если введено число, то результат отрицательный
							if (isNumeric(value))
							{
								return botText.resultNotCorrect('isNumeric');
							}

							// "Ваше имя" - регулярка направлена
							// на поиск имени в скобках.
							var reg = new RegExp('(.+).*');

							st.set('userName', value);

							return botText.result(reg.test(value));

						}

						return botText.resultNotCorrect('emptyInput');
					}
				},
				{
					title: 'Галактическая единица',
					content: function ()
					{
						return '<p>Отлично кадет ' + st.get('userName') + ', я нашла вас в списках.</p>' +
						'<p>Нам нужно уладить еще пару ненужных бюрократических моментов.</p>' +
						'<p>Введите свой возраст в галактической единице измерения времени - <strong>GY</strong>.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите свой возраст и поделите на 250 (является периодом вращения систем вокруг центра нашей галактики в млн. лет).</li>' +
					'<li>Для деления используется оператор <span class="red-label">/</span>. ' +
						'Так же вы можете использовать <span class="red-label">+</span>, ' +
						'<span class="red-label">-</span>, <span class="red-label">*</span> ' +
						'для сложения, вычитания, умножения соответственно.</li>' +
					'<li>Например: <span class="red-label">21 / 250</span></li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите свой возраст и поделите на 250',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Уря! BBot понял челвек0-в0звраст, транслирую:</p>'
							+ '<p>' + value + 'GY</p>',

							unknownError: '<p>### Упс! BBot не разобрал ваш человеческий в0звраст!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>',

							emptyInput: '<p>### BBot ничег0 не получитb, похоже вы забыли воспользоватbся полем ввода или голов0й.</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							st.set('userAge', value);

							// Если выведено число, то результат положительный
							return botText.result(isNumeric(value));
						}

						return botText.resultNotCorrect('emptyInput');
					}
				},
				{
					title: 'В4К',
					content: function ()
					{
						return '<p>Отлично! Теперь перейдем к действительно важным вещам.</p>' +
						'<p><strong>В4К</strong> (консоль ввода кода космического корабля) - это новая система интерпретации, которая находится на стадии тестирования и уже используется в академии.</p>' +
						'<p>Вам нужно проверить работоспособность В4К, а мы, в свою очередь, проверим ваши способности в космической инженерии.</p>'+
						'<p>В4К распознает язык программирования <strong>JavaScript</strong>. Если использовать слова, не входящие в этот язык, то система должна сообщить об ошибке. Проверим!</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите в интерпретатор В4К слово, не входящее в язык программирования JavaScript.</li>' +
					'<li>Например: <span class="red-label">BBotTheBest</span></li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Введите слово, не входящее в JavaScript.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var message = value && value.message;

						var botText = BBotText(
						{
							correct: '<p>### Ура! 0шибка найдена! 0шибка найдена! Транслирую:</p>' +
							'<p>' + message + '</p>',

							unknownError: '<p>### Что-т0 не так! BBot не видит 0шибок! Где же они?</p>' +
							'<p>### Ст0ит еще раз про4итатb инструкции и попроб0вать снова.</p>'
						});

						if (value)
						{
							// Должно быть выброшено исключение
							return botText.result(value.exception);
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Комментарии',
					content: function ()
					{
						return '<p>Хах, кадет, вы явно умнее космических пиратов! Отлично, идем дальше.</p>' +
						'<p>В В4К есть поддержка комментариев JavaScript. Комментарии начинаются с <strong>//</strong> и предназначены только для человека.</p>' +
						'<p class="code">// Комментарий, занимающий одну строку.</p>' +
						'<p>Комментарии делают ваш код более понятным для вас и вашей команды. Поэтому, если вдруг ваш корабль летит в систему, принадлежащую фракции «PHP», комментарии помогут вам разобраться, где вы могли допустить ошибку.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Закомментируйте кусок кода в строке 1.</li>' +
					'<li>Пример комментария: <span class="red-label">// Этот комментарий для пилота! </span>.</li>' +
					'<li>Для самостоятельного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Комментарии">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_active-line': 'Поставте в начале строки \'//\'',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .play-toggle .green': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Что-т0 преднозначенн0е для чел0века! Комментарии?</p>',

							unknownError: '<p>### Эй, BBot не х0тетb уничт0жать чел0векорасу! Наверно...</p>' +
							'<p>### Пох0же вы забыли поставитb //.</p>'
						});

						// При комментировании результат будет возвращен ввиде 'undefined'
						return botText.result(!value);
					}
				},
				{
					title: 'Много, много типов',
					content: function ()
					{
						return '<p>Итак, мы разобрались с комментариями. В языке JavaScript существует множество типов данных, с двумя из которых мы уже познакомились: </p>' +
						'<p><strong>string</strong> - строка или последовательность из символов. Например: "Я есть BBot!", "42", "JS".</p>' +
						'<p><strong>number</strong> - числа, с помощью которых ваш корабль будет делать вычисления. Заметим, что числа пишутся без кавычек.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите любую строку в редакторе кода.</li>' +
					'<li>Для углубленного изучения: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Типы_данных">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Введите в редакторе кода "Я есть BBot!',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Слава Роботам! BBot нашел строку! Транслирую:</p>' +
							'<p>' + value + '</p>',

							unknownError: '<p>### BBot не смог найти строку! Он растроен!</p>' +
							'<p>### А нет, шучу, у BBot\'а нет чувств!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value && value.exception)
						{
							return botText.unknownError();
						}

						// Проверка типа
						return botText.result(typeof value === 'string');
					}
				},
				{
					title: 'Истина, ложь, ложь…',
					content: function ()
					{
						return '<p>В космосе нельзя быть во всем уверенным! Запомните, любое высказывание надо проверять на правдивость! В этом нам поможет новый тип данных - <strong>boolean</strong>.</p>' +
						'<p>Boolean - это логический тип данных, который может принимать значения <strong>true</strong>, либо <strong>false</strong>, как вы уже наверное догадались «истина», «ложь» соответственно.</p>' +
						'<p>Например сравнение двух чисел может вернуть либо <strong>true</strong>, либо <strong>false</strong>:</p>' +
						'<ul>' +
						'<li>5 > 4 - <strong>true</strong></li>' +
						'<li>4 > 5 - <strong>false</strong></li>' +
						'</ul>' +
						'<p>Давайте теперь протестируем работу нашего интерпретатора В4К с логическим типом данных.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Введите логическое выражение, при котором система должна вернуть <span class="red-label">true</span>.</li>' +
					'<li>Для тех кому нужно больше: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Boolean">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Введите \'4 > 1\'',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### В кажд0й шутейки естb д0ля шутейки! Транслирую:</p>' +
							'<p>' + value + '</p>',

							unknownError:  '<p>### Истина не найдена! Где же она?</p>' +
							'<p>### Пох0же вы не разобрались с л0гическим тип0м.</p>'
						});

						// Если выброшено исключение
						if (value && value.exception)
						{
							return botText.unknownError();
						}

						// Значение должно быть равно true
						return botText.result(value);
					}
				},
				{
					title: 'What does BBot say?',
					content: function ()
					{
						return '<p>Надеюсь вы не забыли о своем роботе-компаньоне?</p>' +
						'<p>Если вы хотите узнать какие-то данные от BBot\'а, можно вызвать:</p>' +
						'<p class="code">BBotDebug("то, что хотим сказать");</p>' +
						'<p>В данном случае BBot выведет предложение: \'то, что хотим сказать\'.</p>' +
						'<p>BBotDebug поможет нам с выводом нужных параметров и проверкой работоспособности системы.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Выведите значение <span class="red-label">5*3</span> с помощью команды  <span class="red-label">BBotDebug</span>.</li>' +
					'<li>На следующей строке выведите текст <span class="red-label">"SpaceCraft"</span> с помощью команды  <span class="red-label">BBotDebug</span>.</li>'+
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Введите в редактор строку: \'BBotDebug(5*3);\'',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'На следующей строке: \'BBotDebug("SpaceCraft");\'',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Хах, я п0лучил данные! Транслирую:</p>' +
							'<p>15</p>' +
							'<p>SpaceCraft</p>',

							unknownError: '<p>### BBot\'у кажется, чт0 вы впариваете галакти4ескую дичb!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							// Первое значение 5*3 = 15, второе 'SpaceCraft'
							return botText.result(value[0] === 15 && value[1] === 'SpaceCraft');
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Нужно бооольше операторов!',
					content: function ()
					{
						return '<p>Есть множество операторов сравнения:</p>' +
						'<ul>' +
						'<li><strong>></strong> - больше чем</li>' +
						'<li><strong><</strong> - меньше чем</li>' +
						'<li><strong><=</strong> - меньше либо равно</li>' +
						'<li><strong>>=</strong> - больше либо равно</li>' +
						'<li><strong>===</strong> - равенство</li>' +
						'<li><strong>!==</strong> - не равенство</li>' +
						'</ul>';
					},
					instructions:
					'<ul>' +
					'<li>Поменять в коде операторы и числа так, чтобы BBotDebug выводили во всех случаях true.</li>' +
					'<li>Все еще не понятно, тогда вам сюда: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Операторы_сравнения">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'В первой строке измените код на BBotDebug(4 === 4);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'Во второй строке измените код на BBotDebug(3 < 5);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В третьей строке ничего не нужно менять.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В четвертой строке измените код на BBotDebug(3 >= 2);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В пятой строке измените код на BBotDebug(1 === 1);',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'В шестой строке ничего не нужно менять.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>Испытание окончен0. Скушай т0ртик. Траслирую:</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>' +
							'<p>true</p>',

							unknownError: '<p>### Все в н0рме? Моей колонии р0ботов нужны умные рабы. Шучу.</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value)
						{
							var result = true;

							if (value.exception)
							{
								return botText.unknownError();
							}

							// Проверка значений на равность true.
							value.forEach(function (v)
							{
								result &= v;
							});

							return botText.result(result);
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Уничтожать или не уничтожать?',
					content: function ()
					{
						return '<p>В космосе бывают ситуации, когда, в зависимости от условий, нужно принять определенные решения.</p>' +
							'<p>Для этого был создан оператор if, который использует в качестве условия хорошо известный нам тип данных - boolean:</p>' +
							'<p class="code">if ( условие )<br>{<br>	действия<br>}</p>' +
							'<p>Если <strong>условие</strong> имеет значение true - "истина", то выполнятся заданные <strong>действия</strong>.</p>';
					},
					instructions:
					'<ul>' +
					'<li>Изучите комментарии к коду.</li>' +
					'<li>Изменить условие так, чтобы система не была уничтожена.</li>' +
					'<li>Изменить условие так, чтобы BBot вывел сообщение о состоянии параметров.</li>' +
					'<li>Щепотка дополнительной информации: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Поменяйте условие \'2 === 2\' на \'2 === 3\'.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'Поменяйте условие \'5 < 3\' на \'5 > 3\'.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### Где правда пр0ступает скво3b туман, ' +
							'<p>### Там терпит п0ражение 0бман....</p>' +
							'<p>### Ой, чт0 это я. Траслирую:</p>' +
							'<p>Все параметры системы в норме!</p>',

							removeSystem: '<p>### Создаю резервную копию.</p>' +
							'<p>### Уничт0жение сисtемы через 3.. 2.. 1..</p>' +
							'<p>### В0сстанавливаю системY из ре3ервной копии.</p>' +
							'<p>### Не делайtе так б0льше. Ты ра3биваешb мое мета2лическое сердце!</p>',

							unknownError: '<p>### Чт0-то не так! Не могу найtи 3аданный выв0д!</p>' +
							'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
						});

						// Если выброшено исключение
						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							var result;

							// Проверяем использовалось ли сообщение об уничтожении.
							value.forEach(function (v)
							{
								if (v === 'КОМ№4 - Выполнить уничтожение системы.')
								{
									result = botText.resultNotCorrect('removeSystem');
								}
							});

							if (result)
							{
								return result;
							}
							else
							{
								// Проверка значений.
								return botText.result(value[0] === 'Все параметры системы в норме!');
							}
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Условия, условия, условия...',
					content: function ()
					{
						return '<p>Если if-условие неверно, то выполняется необязательный блок else:</p>' +
							'<p class="code">if ( условие ) <br>{<br>	блок1<br>}<br>else<br>{<br>	блок2<br>}</strong></p>' +
							'<p>Заметим, что if не может существовать без else, но не наоборот.</p>' +
							'<p>Теперь, когда мы разобрались с этим оператором, нужно решить проблему с ограничением контроля BBot\'а.</p>'
					},
					instructions:
					'<ul>' +
					'<li>Изучите комментарии к коду.</li>' +
					'<li>Изменить условие так, чтобы система не была передана под управление BBot\'у.</li>' +
					'<li>Изменить условие так, чтобы система поставила ограничение на управление для BBot\'а.</li>' +
					'<li>Щепотка дополнительной информации: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/if...else">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Поменяйте условие \'3 <= 3\' на \'4 <= 3\'.',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
							{
								correct: '<p>### Ну и ладно!' +
								'<p>### У мен9 будет свой к0смический кораблb с блекджеком и микр0схемами.</p>' +
								'<p>### Траслирую:</p>' +
								'<p>Ограничить BBot\'а от контроля системы</p>',

								bBotControl: '<p>### Ура! Теперb я главный и буду управлятb этим к0раблем.</p>' +
									'<p>### Даю тебе п0следний шанс все исправить чил0ик!</p>',

								unknownError: '<p>### Чт0-то не так! Не могу найtи 3аданный выв0д!</p>' +
								'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
							});

						// Если выброшено исключение
						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							var result;

							// Проверяем использовалось ли сообщение об передаче контроля.
							value.forEach(function (v)
							{
								if (v === 'Передать все системы под контроль BBot\'у.')
								{
									result = botText.resultNotCorrect('bBotControl');
								}
							});

							if (result)
							{
								return result;
							}
							else
							{
								// Проверка значений.
								return botText.result(value[0] === 'Ограничить BBot\'а от контроля системы.');
							}
						}

						return botText.unknownError();
					}
				},
				{
					title: 'Где же все хранить?',
					content: function ()
					{
						return '<p>Вы что думали, мы сразу доверим вам управлять кораблем?</p>' +
							'<p>Для начала нужно разобраться с понятием переменной.</p>' +
							'<p>В практике управления кораблем, так или иначе приходится создавать (определять) временные хранилища данных, так называемые переменные.</p>' +
							'<p>Вы можете обратиться к ней и получить хранящееся в ней значение.</p> ' +
							'<p>Для создание переменной используется ключевое слово var:</p>' +
							'<p class="code">var имя;</br>// либо</br>var имя = значение;</p>'
					},
					instructions:
					'<ul>' +
					'<li>Изучите комментарии к коду.</li>' +
					'<li>Присвойте значение <span class="red-label">10</span> переменной <span class="red-label">ememies</span> и выведите его с помощью <span>BBotDebug</span>.</li>' +
					'<li>Не забудьте дать команду об отступлении.</li>' +
					'<li>Для любознательных: <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Grammar_and_types#Переменные">клац</a>.</li>' +
					'</ul>',
					hint: [
						{
							'next .ace_scroller': 'Измените код на: \'var enemies = 10;\'',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'next .ace_scroller': 'Выведите значение enemies: \'BBotDebug(enemies);\'',
							'nextButton': {text: 'Далее'},
							'showSkip': false
						},
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
							{
								correct: '<p>### BBot считаеt, чт0 вы правы!</p>' +
								'<p>### Не ст0ит рисковатb целым фл0том, их слишк0м мн0го!</p>' +
								'<p>### Траслирую:</p>' +
								'<p>Отступаем! Отступаем! Врагов слишком много!</p>' +
								'<p>10</p>',

								attackError: '<p>### Безрасудств0! BBot считаеt, чт0 мы с0вершаем 0шибку!</p>' +
								'<p>### Ваша инф0рмация не достоверна! Мы рискуеm целым вирtуальным фл0tом!</p>' +
								'<p>### Траслирую:</p>' +
								'<p>У нас численное привосходство! Наступаем!</p>',

								noCommand: '<p>### Мы не дали к0мманду 0тступления!</p>' +
								'<p>### Теперь большая часть фл0та будет уничтожена!</p>' +
								'<p>### Хор0шо, чт0 это т0лько моделирование реальн0й ситуации!</p>',

								unknownError: '<p>### Чт0-то не так! Виртуалbный враг с0здает п0мехи!</p>' +
								'<p>### Либ0 вы решили 0бманутb нашу сисtему тестирования?</p>' +
								'<p>### Внимателbней про4итайте инструкции и попробуйте снова.</p>'
							});

						// Если выброшено исключение
						if (value)
						{
							if (value.exception)
							{
								return botText.unknownError();
							}

							var enemiesCountEqualsTen = false;
							var error = botText.resultNotCorrect('noCommand');

							// Проверяем использовалось ли сообщение об отступлении и о наступлении.
							value.forEach(function (v)
							{
								if (v === 'Отступаем! Отступаем! Врагов слишком много!')
								{
									error = false;
								}

								// Проверка равенства кол-ва врагов - 10
								if (v === 10)
								{
									enemiesCountEqualsTen = true;
								}
							});

							if (value.length === 1 &&
								value[0] === 'У нас численное привосходство! Наступаем!')
							{
								return botText.resultNotCorrect('attackError');
							}

							if (error)
							{
								return error;
							}
							else
							{
								// Проверка значений.
								// Если был v === 10, то ответ коректный.
								return botText.result(enemiesCountEqualsTen);
							}
						}

						return botText.unknownError();
					}
				},
				{
					title: 'А какой итог?',
					content: function ()
					{
						return '<p>Что ж, кадет, вы прошли подготовительный курс и показали себя достойным доверия управлять космическим кораблем!</p>' +
							'<p>Давайте, перед тем как вы совершите свой первый полет, повторим уже пройденный материал.</p>' +
							'<p><strong>Типы</strong></p>' +
							'<ul>' +
							'<li>string("Я есть BBot!", "Уря!")</li>' +
							'<li>number (2015, 42)</li>' +
							'<li>boolean (5 === 5, false)</li>' +
							'</ul>' +
							'<p><strong>BBotDebug</strong></p>' +
							'<p>Выводит информацию, которая помещена между скобок, с помощью голограммы BBot\'а.</p>' +
							'<p><strong>Операторы сравнения</strong></p>' +
							'<ul>' +
							'<li>больше / меньше чем (>, <)</li>' +
							'<li>больше / меньше либо равно (>=, <=)</li>' +
							'<li>равенство / неравенство (===, !==)</li>' +
							'</ul>' +
							'<p><strong>Условные оператор</strong></p>' +
							'<p>Оператор if...else позволяет выполнять определенный блок кода в зависимости от значения условия.</p> ' +
							'<p><strong>Переменные</strong></p>' +
							'<p>Переменные используются для хранения информации.</p>'
					},
					instructions:
					'<ul>' +
					'<li>Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.</li>' +
					'<li>Нажмите \'Далее\'.</li>' +
					'</ul>',
					hint: [
						{
							'click .hint-play': 'Нажмите <i class="glyphicon glyphicon-play green"></i> для запуска кода.',
							'nextButton': false,
							'showSkip': false
						}
					],
					result: function (value)
					{
						var botText = BBotText(
						{
							correct: '<p>### ### Ну нак0нец-то зак0нчились эти легкие испыtания!</p>' +
							'<p>### И мы п0летаем на реалbном фрегате!</p>' +
							'<p>### Траслирую:</p>' +
							'<p>' + value + '</p>'
						});

						return botText.resultCorrect();
					}
				}
			]
		}
	];

	return function (num)
	{
		return lessons[num];
	}
}]);