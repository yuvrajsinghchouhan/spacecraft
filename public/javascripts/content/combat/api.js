'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 *
 * @param player
 */
function Api(player) {

	var api = {};

	api.isAlive = isAlive;
	api.moveForward = moveForward;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;

	return api;

	function moveForward() {

		player.moveForward();

	}

	function isAlive() {

		return player.sprite.alive;

	}

}