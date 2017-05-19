'use strict';

module.exports = Base;

/**
 * Prefab базы.
 *
 * @author Skurishin Vladislav
 * @since 11.06.16
 */
function Base(game, x, y, type) {

	var t = game.add.sprite(x, y, type);

	// Центрирование
	t.anchor.x = 0.8;
	t.anchor.y = 0.5;

	game.physics.arcade.enableBody(t);

	return t;

}