'use strict';

LessonBoard.$inject = ['$sce'];

module.exports = LessonBoard;

/**
 * Директива вывода текстового контента уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function LessonBoard($sce) {

	var directive = {
		scope:       {
			lesson:      '=' // информация о уроке
		},
		templateUrl: 'views/directives/lesson-board.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.getContent = getContent;
		$scope.getHint = getHint;
		$scope.getInstructions = getInstructions;
		$scope.showHint = showHint;

		// ==================================================

		/**
		 * Возвращает контент урока.
		 */
		function getContent () {

			// Проверка html на предмет xss
			return $sce.trustAsHtml($scope.lesson.content());

		}

		/**
		 * Возвращает текст подсказки.
		 */
		function getHint () {

			if ($scope.lesson.hint) {

				return $sce.trustAsHtml($scope.lesson.hint);

			}

		}

		/**
		 * Инструкции пользователю.
		 */
		function getInstructions () {

			return $sce.trustAsHtml($scope.lesson.instructions);

		}

		function showHint () {

			$scope.hint = !$scope.hint;

		}

	}

}
