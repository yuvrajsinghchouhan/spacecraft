'use strict';

// Экспорт
module.exports = Api;

/**
 * API для работы с кораблем кода.
 */
function Api(player) {

	// Дистанция в пределах которой работает подъем грузов
	var CARGO_DISTANCE = 30;

	var api = {};

	var cargoUnloadFlag = false;
	var cargoLoadFlag = false;

	api.moveForward = player.moveForward;
	api.moveToXY = player.moveToXY;
	api.rotateLeft = player.rotateLeft;
	api.rotateRight = player.rotateRight;
	api.unloadCargoWithoutFlag = player.unloadCargo;
	api.isCargoLoad = isCargoLoad;
	api.loadCargo = loadCargo;
	api.unloadCargo = unloadCargo;
	api.isNearPoint = isNearPoint;
	api.isCargoUnload = isCargoUnload;
	api.isAlive = isAlive;

	return api;

	function loadCargo(value) {

		cargoLoadFlag = true;

		player.loadCargo(value);
	}

	function isCargoLoad() {

		return cargoLoadFlag;

	}

	function isCargoUnload() {

		return cargoUnloadFlag;

	}

	function isAlive() {

		return player.alive;

	}

	function isNearPoint(x, y) {

		return player.distanceTo(x, y) <= CARGO_DISTANCE;

	}

	function unloadCargo() {

		cargoUnloadFlag = true;

		return player.unloadCargo();
	}
}
