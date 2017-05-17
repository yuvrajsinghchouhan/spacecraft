'use strict';

module.exports = PreloadState;

/**
 * Состояние инициализации ресурсов, картинок, аудио игры.
 *
 * @author Skurishin Vladislav
 * @since 02.12.15
 */
function PreloadState(game) {

	var t = {};

	var preloadSprite;

	t.isPreloading = true;

	t.preload = preload;
	t.create = create;
	t.update = update;

	return t;

	/**
	 *  Этап перед созданием состояния.
	 */
	function preload() {

		var centerX = game.width / 2;
		var centerY = game.height / 2;

		preloadSprite = game.add.sprite(centerX, centerY, 'preload');

		preloadSprite.anchor.setTo(0.5, 0.5);

		// когда все ресурсы будут загружены вызываем callback
		game.load.onLoadComplete.addOnce(onLoadComplete);
		game.load.setPreloadSprite(preloadSprite);

		loadImageOrAudio(t.resources.sprites, true);

		game.load.spritesheet('explosion', 'images/animations/explosion.png', 128, 128);

		loadImageOrAudio(t.resources.audio);

	}

	function loadImageOrAudio(resources, isImage) {

		Object.keys(resources).forEach(function (key) {

			if(isImage)
			{
				game.load.image(key, resources[key]);
			}
			else
			{
				game.load.audio(key, resources[key]);
			}

		}, resources);
	}
	/**
	 * Этап создания состояния.
	 */
	function create() {

		preloadSprite.cropEnabled = false;

	}

	/**
	 * Этап обновления состояния.
	 */
	function update() {

		// Загружаемся?
		if (!t.isPreloading) {

			// Переходим в состояние - игры
			game.state.start('play');

		}

	}

	/**
	 * При выполнении загрузки всех asset'ов
	 */
	function onLoadComplete() {

		t.isPreloading = false;

	}

}
