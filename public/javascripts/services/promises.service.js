'use strict';

Promises.$inject = ['$q', 'authentication', 'connection', 'statisticsStorage'];

var Game = require('../game');

module.exports = Promises;

/**
 * Модуль введен с целью укомплектования в себя набор многократно используемых
 * promise'ов в коде.
 * Намного удобней и компактней смотрится обращение к методу из этого набора напрямую,
 * нежели явное определение анонимной функции.
 * Преимущественно используется в resolve'ах состояний.
 * Но модуль своим именем не запрещает применять и в иных местах :)
 *
 * @since 11.02.17
 * @author greezlock
 */

function Promises($q, authentication, connection, statisticsStorage) {

	var t = {};

	t.getAuthenticationStatus = getAuthenticationStatus;

	t.getLessonStatisticsData = getLessonStatisticsData;
	t.getLeaderBoardData = getLeaderBoardData;
	t.getUserProgressData = getUserProgressData;
	t.getUserInfoData = getUserInfoData;
	t.getGame = getGame;

	return t;

	/**
	 * Параметры позволяют управлять поведением разрешения promise'a:
	 * - resolveAlways - promise будет ВСЕГДА разрешен (т.е. в любом случае будет вызван resolve);
	 * - ignoreAuthModule - игнорирование angular-http-auth сервиса (он не будет отлавливать 401 код и тем самым
	 *                      даст нам обработать ответ от сервера).
	 */
	function getAuthenticationStatus(args) {

		// На случай, если параметры не определены совсем.
		args = args || {};

		if (args.resolveAlways) {

			return $q(function (resolve) {

				authentication.getAuthenticationStatus(args.ignoreAuthModule, resolve, resolve);

			})

		}

		return $q(authentication.getAuthenticationStatus.bind(null, args.ignoreAuthModule));

	}

	function getLessonStatisticsData() {

		return $q(connection.getLessonsStatistics);

	}

	function getLeaderBoardData() {

		return $q(connection.getLeaderBoard);

	}

	function getUserProgressData() {

		return $q(statisticsStorage.getUserProgress);

	}

	function getUserInfoData() {

		return $q(connection.getUserInfo);

	}

	function getGame(id) {

		return $q(Game.initialization.bind(null, id));

	}

}