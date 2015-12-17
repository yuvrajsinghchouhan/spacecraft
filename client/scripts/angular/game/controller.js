/**
 * Created by vladthelittleone on 30.11.15.
 */
var app = angular.module('spacecraft.game');

app.controller('GameController', ['$scope', '$storage', 'autocompleter',
	function ($scope, $storage, autocompleter)
{
	//===================================
	//============== CODE ===============
	//===================================

	var code = $storage.local.getItem('code') || 'this.run = function(spaceCraft, world)\n{\n\n}\n';

	$scope.ep =
	{
		isCodeRunning: false,
		code: code,
		error: null
	};

	$scope.toggleCodeRun = function ()
	{
		$scope.ep.isCodeRunning = !$scope.ep.isCodeRunning;
	};

	//===================================
	//============== HIDE ===============
	//===================================

	$scope.hideEditor = false;
	$scope.hideDoc = true;

	$scope.toggleEditorOpen = function ()
	{
		$scope.hideEditor = !$scope.hideEditor;
	};

	$scope.toggleDocOpen = function ()
	{
		$scope.hideDoc = !$scope.hideDoc;
	};

	//===================================
	//============== TIPS-TRICKS ========
	//===================================

	$scope.tipsAndTricks = { hide: $storage.local.getItem('tipsAndTricks') };

	$scope.toggleTipsAndTricks = function ()
	{
		$scope.tipsAndTricks.hide = !$scope.tipsAndTricks.hide;
	};

	//===================================
	//============== EDITOR =============
	//===================================

	var editorSession;

	$scope.aceChanged = function ()
	{
		$scope.ep.code = editorSession.getDocument().getValue();
		$storage.local.setItem('code', $scope.ep.code);
	};

	$scope.aceLoaded = function (editor)
	{
		editorSession = editor.getSession();
		editor.$blockScrolling = Infinity;
		editorSession.setValue($scope.ep.code);

		var langTools = ace.require('ace/ext/language_tools');
		var spaceCraftCompleter = autocompleter(editor);

		editor.completers = [spaceCraftCompleter];
		editor.setOptions(
		{
			enableSnippets: false,
			enableBasicAutocompletion: true
		});

		langTools.addCompleter(spaceCraftCompleter);

		$storage.local.setItem('code', $scope.ep.code);
	};
}]);
