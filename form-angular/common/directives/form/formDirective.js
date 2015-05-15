formModule.directive('uiForm', ['$compile', function ($compile) {

	return {
		restrict: 'E',
		transclude: true,
		replace: true,

		template: '<ng-form class="form-horizontal" novalidate data-ng-transclude></ng-form>',

		link: function (scope, element, attrs) {

			if ('string' == typeof scope.cssClass && scope.cssClass.length > 0) {
				element.attr('class', scope.cssClass)
			}

			if ('string' == typeof scope.formName && scope.formName.length > 0) {
				element.attr('name', scope.formName);
			}

			element.on('$destroy', function(){
				// Nothing to do yet.
			});

			$compile(element.contents())(scope);
		}
	}
}]);