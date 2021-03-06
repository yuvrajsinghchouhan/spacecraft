'use strict';

LessonBoard.$inject = ['$sce', 'lessonService'];

module.exports = LessonBoard;

/**
 * Директива вывода текстового контента уроков.
 *
 * @since 23.12.15
 * @author Skurishin Vladislav
 */
function LessonBoard($sce, lessonService) {

	var directive = {
		scope:       {
			lesson:      '=' // информация о уроке
		},
		templateUrl: 'views/directives/lesson/board.html',
		link:        link,
		restrict:    'EA'
	};

	return directive;

	function link($scope) {

		$scope.getContent = getContent;
		$scope.getHint = getHint;
		$scope.getInstructions = getInstructions;
		$scope.showHint = showHint;

		$scope.$watch('lesson', onLessonChange);

		// ==================================================
		// ======================PUBLIC======================
		// ==================================================

		/**
		 * Возвращает контент урока.
		 */
		function getContent () {

			// Проверка html на предмет xss
			if ($scope.lesson && $scope.lesson.content) {

				return $sce.trustAsHtml($scope.lesson.content());

			}

		}

		/**
		 * Возвращает текст подсказки.
		 */
		function getHint () {

			if ($scope.lesson && $scope.lesson.hint) {

				return $sce.trustAsHtml($scope.lesson.hint);

			}

		}

		/**
		 * Инструкции пользователю.
		 */
		function getInstructions () {

			if ($scope.lesson) {

				return $sce.trustAsHtml($scope.lesson.instructions);

			}

		}

		function showHint () {

			$scope.hint = !$scope.hint;

			tryIncPenaltyPoints();
		}

		// ==================================================
		// ======================PRIVATE======================
		// ==================================================

		/**
		 * Штрафуем пользователя за обращение к подсказке.
		 */
		function tryIncPenaltyPoints() {

			var currentLessonStatistics = lessonService.getCurrentLessonStatistics();

			if ($scope.hint && currentLessonStatistics) {

				// если штрафные очки не указаны, то шрафуем пользователя на 0 очков.
				// TODO если потребуеться по умолчанию штрафовать пользователь больше чем на ноль очков
				// то заменить 0 на необходимое значение
				var showHitPenaltyPointsSize = lessonService.getCurrentLessonContentPoints()
					                                        .showHitPenaltyPointsSize || 0;

				currentLessonStatistics.incPenaltyPointsForGame(showHitPenaltyPointsSize);

			}

		}

		function onLessonChange() {

			$scope.hint = false;

		}

	}

}
