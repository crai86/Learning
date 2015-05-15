formModule.factory('formService', function(){

	var addIsRequiredValidation = function(element) {
		element.setAttribute('required', 'required');
	};

	var addMinLengthValidation = function(element, value) {
		element.setAttribute('data-ng-minlength', value);
	};

	var addMaxLengthValidation = function(element, value) {
		element.setAttribute('data-ng-maxlength', value);
	};

	var addMinValueValidation = function(element, value) {
		element.setAttribute('min', value);
	};

	var addMaxValueValidation = function(element, value) {
		element.setAttribute('max', value);
	};

	var addPatternValidation = function(element, regex) {
		element.setAttribute('data-ng-pattern', regex);
	};

	// This will be fetched through meta-data.
	var _messages = {
		required: 'This field is required.',
		number: 'This field should be a numeric field.',
		integer: 'This field should be an integer number.',
		float: 'This field should be an float number.',
		date: 'This should be a valid date field.',
		boolean: 'Should be a boolean',
		minlength: 'This field should be at least %1% characters.',
		maxlength: 'This field should be at most %1% characters.',
		max: 'The maximum value for this field is %1%.',
		min: 'The minimum value for this field is %1%.',
		date: 'This should be a valid date field.',
		pattern: 'This is an incorrect pattern.'
	};

	return {

		/**
		 * This method returns a label element, and if required adds the asteriks.
		 *
		 * @param {Object} configuration
		 * {
		 *  label: {String}
		 *  isRequired: {Boolean}
		 * }
		 * @returns {Element}
		 */
		getLabelElement: function (configuration) {

			// Create the label element and add the label text.
			var labelElement = document.createElement('label');
			labelElement.setAttribute('class', 'control-label col-md-4');

			if ('undefined' != typeof configuration.label) {
				labelElement.appendChild(document.createTextNode(configuration.label));
			}

			if (true == configuration.isRequired) {

				// Create a wrapper for the required asterisk icon to make it small.
				var requiredIconWrapper = document.createElement('sup');

				// Create required icon via bootstrap convention.
				var requiredIcon = document.createElement('span');
				requiredIcon.setAttribute('class', 'glyphicon glyphicon-asterisk text-danger');

				// Add icon to the wrapper.
				requiredIconWrapper.appendChild(requiredIcon);

				// Add wrapper to the label.
				labelElement.appendChild(requiredIconWrapper);
			}

			return labelElement;
		},

		/**
		 * This method creates an input element wrapped inside a sizable container.
		 *
		 * @param {Object} configuration
		 * {
		 *  name: {String}
		 *  type: {String} Supports, text, hidden, password, email, url // TODO Convert to enum.
		 *  isReuired: {Boolean}
		 *  minlength: {Number}
		 *  maxlength: {Number}
		 *  pattern: {RegEx}
		 * }
		 */
		getInputElement: function (name, ngModel, configuration, message) {

			// Create input element.
			var inputElement = document.createElement('input');
			inputElement.setAttribute('type', configuration.type);
			inputElement.setAttribute('name', name);
			inputElement.setAttribute('class', 'form-control');
			inputElement.setAttribute('placeholder', configuration.placeholder);
			inputElement.setAttribute('data-ng-model', ngModel);

			if ('undefined' != typeof message){
				inputElement.setAttribute('data-popover', '{{' + message + '}}');
				inputElement.setAttribute('data-popover-placement', 'bottom');
				inputElement.setAttribute('data-popover-trigger', 'focus');
			}

			// Decorate element with validation rules, requirement.
			if (true == configuration.isRequired) {

				addIsRequiredValidation(inputElement);
			}

			// Decorate element validation rules, minlength.
			if ('undefined' != typeof configuration.minlength && configuration.minlength > 0) {

				addMinLengthValidation(inputElement, configuration.minlength);
			}

			// Decorate element validation rules, maxlength.
			if ('undefined' != typeof configuration.maxlength && configuration.maxlength > 0) {

				addMaxLengthValidation(inputElement, configuration.maxlength);
			}

			// Decorate element validation rules, min value. For number and date types only.
			if ('undefined' != typeof configuration.min) {

				addMinValueValidation(inputElement, configuration.min);
			}

			// Decorate element validation rules, max value. For number and date types only.
			if ('undefined' != typeof configuration.max) {

				addMaxValueValidation(inputElement, configuration.max);
			}

			// Decorate element validation rules, regex pattern.
			if (configuration.pattern) {

				addPatternValidation(inputElement, configuration.pattern);
			}

			// Create wrapper.
			var inputElementWrapper = document.createElement('div');
			inputElementWrapper.setAttribute('class', 'col-md-8');

			inputElementWrapper.appendChild(inputElement);
			return inputElementWrapper;
		},

		/**
		 * This method fecthes validation message depending on the fields client-side validation rules.
		 *
		 * @param field {Object} Angular form element.
		 * @param element {Element} [OPTIONAL] DOM element.
		 * @returns {String}
 		 */
		getMessages: function (field, element) {

			var message = '\u2714';

			if (('undefined' == typeof(field)) || field.$valid) {
				return message;
			}

			message = '\u2718';

			if ('undefined' == typeof element) {
				var element = document.getElementsByName(field.$name);
			}

			//var temp = field.$error;

			if (field.$error.required) {
				message += ' -' + _messages.required;
			}
			if (field.$error.number) {
				message += ' -' + _messages.number;
			}
			if (field.$error.boolean) {
				message += ' -' + _messages.boolean;
			}
			if (field.$error.date) {
				message += ' -' + _messages.date;
			}
			if (field.$error.minlength) {
				message += ' -' + _messages.minlength.replace('%1%', element[0].getAttribute('data-ng-minlength'));
			}
			if (field.$error.maxlength) {
				message += ' -' + _messages.maxlength.replace('%1%', element[0].getAttribute('data-ng-maxlength'));
			}
			if (field.$error.min) {
				message += ' -' + _messages.min.replace('%1%', element[0].getAttribute('min'));
			}
			if (field.$error.max) {
				message += ' -' + _messages.max.replace('%1%', element[0].getAttribute('max'));
			}
			if (field.$error.pattern) {
				message += ' -' + _messages.pattern;
			}

			return message;
		}
	}
});