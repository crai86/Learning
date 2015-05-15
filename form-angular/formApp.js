angular.module('formApp', ['ui.bootstrap', 'directiveModule', 'formModule']).controller('FormAppController', ['$scope', 'formService', function ($scope, formService) {

	var _this = this;

	// Should be fetched through service.
	var metadata = {
		name: {
			label: 'First Name',
			placeholder: 'Please enter your name',
			type: 'text',
			isRequired: false,
			minlength: 2,
			maxlength: 5,
			pattern: '/^[a-zA-Z ]*$/'
		},
		last: {
			label: 'Last Name',
			placeholder: 'Please enter your last name',
			type: 'text',
			isRequired: true,
			minlength: 3,
			maxlength: 6,
			pattern: '/^[a-zA-Z ]*$/'
		},
		age: {
			label: 'Age',
			placeholder: 'Please enter your age',
			type: 'number',
			isRequired: true,
			max: 30
		},
		birthDay: {
			label: 'Birth Day',
			placeholder: 'Please enter your birth date',
			type: 'date',
			isRequired: true,
			min: '2013-01-01'
		}
	}

	// Should be fetched/submitted through service.
	var payload = {
		name: 'John',
		last: 'Doe',
		age: 10,
		birthDay: '1999-01-01'
	}

	_this.submitHandler = function () {

		console.log('Submitted');
	}

	_this.getScope = function() {
		return $scope;
	}

	_this.getErrorMessage = function(field) {
		return formService.getMessages(field);
	}

	_this.changeLabel = function(){
		_this.model.metadata.name.label = 'New Label';
	}

	// The model should be fetched by a service in real life example.
	_this.model = {
		metadata: metadata,
		payload: payload
	};
}]);