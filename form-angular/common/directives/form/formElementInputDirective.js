formModule.directive('uiFormElementInput', ['$compile', 'formService', function($compile, formService){

	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		require: ['ngModel', '^form'],
		scope: {
			elementName: '@',
			config: '=',
			message: '@'
		},
		template: '<div class="form-group"></div>',

		link: function(scope, element, attrs, parentControllers) {

			var labelElement = formService.getLabelElement({label: scope.config.label, isRequired: scope.config.isRequired});
			element.append(labelElement);

			var inputElement = formService.getInputElement(scope.elementName, attrs.ngModel, scope.config, scope.message);
			element.append(inputElement);

			var ngElement = angular.element(inputElement.getElementsByTagName('input')[0]);

			var myScope = element.scope();

			scope.toggleErrorState = function(s) {

				if (parentControllers[1][scope.elementName].$dirty && parentControllers[1][scope.elementName].$invalid) {
					element.addClass('has-error');
				} else {
					element.removeClass('has-error');
				}
			}

			ngElement.bind('keyup', function() {

				scope.toggleErrorState(myScope);
			});
		}
	};

}]);