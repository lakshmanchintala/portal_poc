angular.module('attRiskManagementApp').directive('menuTab1', function() {
	return {
		controller:'Tab1_cntrl',
		templateUrl : function(elem, attr) {
			return 'views/damage.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab2', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/demandToInformation.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab3', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/witnesses.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab4', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/damagedFacilities.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab5', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/responsibleParty.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab6', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/locates.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab7', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/repairs.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab8', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/time.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab9', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/materials.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab10', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/remarks.html';
		}
	};
});
angular.module('attRiskManagementApp').directive('menuTab11', function() {
	return {
		templateUrl : function(elem, attr) {
			return 'views/photos.html';
		}
	};
});

angular.module('attRiskManagementApp').directive('loading', function () {
    return {
      restrict: 'E',
      replace:true,
      template: '<div class="loading"><img src="assets/img/loading.gif" width="30" height="30" />LOADING...</div>',
      link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
      }
    }
});

angular.module('attRiskManagementApp').directive('saving', function () {
    return {
      restrict: 'E',
      replace:true,
      template: '<div class="loading"><img src="assets/img/loading.gif" width="30" height="30" />AUTO SAVING...</div>',
      link: function (scope, element, attr) {
            scope.$watch('saving', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
      }
    }
});


angular.module('attRiskManagementApp').directive('usMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'assets/img/Blank_US_Map.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.state');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                regionElement.attr("hover-region", "hoverRegion");
                regionElement.attr("cntrl-hr", "cntrl");
                regionElement.attr("hover-state", "hoverState");
                regionElement.attr("grid-options", "gridOptions");
                regionElement.attr("all-Wirecenters", "allWirecenters");
                regionElement.attr("update-Hover", "updateHover");
                $compile(regionElement)(scope);
                //
            })
        }
    }
}]);

angular.module('attRiskManagementApp').directive('region', ['$compile','$location','$anchorScroll', function ($compile,$location,$anchorScroll) {
    return {
        restrict: 'A',
        scope: {
            dummyData: "=",
            hoverRegion: "=",
            cntrlHr:"=",
            hoverState: "=",
            gridOptions:"=",
            allWirecenters:"=",
            updateHover:"="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
                /*scope.hoverRegion = scope.elementId;
                scope.cntrlHr.hr=scope.elementId;
                console.log(scope.hoverRegion);
                scope.updateHover();
                $anchorScroll();*/
            };
            scope.regionMouseOver = function () {      
                scope.hoverRegion = scope.elementId;
                console.log(scope.hoverRegion);
                //element[0].parentNode.appendChild(element[0]);
            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
            element.attr("ng-mouseover", "regionMouseOver()");
            //element.attr("ng-class", "{active:hoverRegion==elementId}");
            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
}]);

angular.module('attRiskManagementApp').value('customSelectDefaults', {
	displayText: 'Select...',
	emptyListText: 'There are no items to display',
	emptySearchResultText: 'No results match "$0"',
	addText: 'Add',
	searchDelay: 300
});

function format(value, replace) {
	if (!value) {
		return value;
	}
	var target = value.toString();
	if (replace === undefined) {
		return target;
	}
	if (!angular.isArray(replace) && !angular.isObject(replace)) {
		return target.split('$0').join(replace);
	}
	var token = angular.isArray(replace) && '$' || ':';

	angular.forEach(replace, function (value, key) {
		target = target.split(token + key).join(value);
	});
	return target;
};
angular.module('attRiskManagementApp').directive('stopPropagation', function () {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs, ctrl) {
			var events = attrs['stopPropagation'];
			elem.bind(events, function (event) {
				event.stopPropagation();
			});
		}
	};
});
angular.module('attRiskManagementApp').directive('customSelect', ['$parse', '$compile', '$timeout', '$q', 'customSelectDefaults', function ($parse, $compile, $timeout, $q, baseOptions) {
	var CS_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
	var VALUES_REGEXP = /^.+?(?=\||$)/;

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attrs, controller) {
			var customSelect = attrs.customSelect;
			if (!customSelect) {
				throw new Error('Expected custom-select attribute value.');
			}

			var match = customSelect.match(CS_OPTIONS_REGEXP);

			if (!match) {
				throw new Error("Expected expression in form of " +
					"'_select_ (as _label_)? for _value_ in _collection_[ track by _id_]'" +
					" but got '" + customSelect + "'.");
			}

			elem.addClass('dropdown custom-select');

			// Ng-Options break down
			var displayFn = $parse(match[2] || match[1]),
				valueName = match[3],
				valueFn = $parse(match[2] ? match[1] : valueName),
				values = match[4],
				valuesFn = $parse(values),
				track = match[5],
				trackByExpr = track ? " track by " + track : "",
				dependsOn = attrs.csDependsOn;

			var options = getOptions(),
				timeoutHandle,
				lastSearch = '',
				focusedIndex = -1,
					matchMap = {};

			var itemTemplate = elem.html().trim() || '{{' + (match[2] || match[1]) + '}}',

				dropdownTemplate =
				'<a class="dropdown-toggle" data-toggle="dropdown" href ng-class="{ disabled: disabled }">' +
					'<span>{{displayText}}</span>' +
					'<b></b>' +
				'</a>' +
				'<div class="dropdown-menu">' +
					'<div stop-propagation="click" class="custom-select-search">' +
						'<input class="' + attrs.selectClass + '" type="text" autocomplete="off" ng-model="searchTerm" />' +
					'</div>' +
					'<ul role="menu">' +
						'<li role="presentation" ng-repeat="' + valueName + ' in matches' + trackByExpr + '">' +
							'<a role="menuitem" tabindex="-1" href ng-click="select(' + valueName + ')">' +
								itemTemplate +
							'</a>' +
						'</li>' +
						'<li ng-hide="matches.length" class="empty-result" stop-propagation="click">' +
							'<em class="muted">' +
								'<span ng-hide="searchTerm">{{emptyListText}}</span>' +
								'<span class="word-break" ng-show="searchTerm">{{ format(emptySearchResultText, searchTerm) }}</span>' +
							'</em>' +
						'</li>' +
					'</ul>' +
					'<div class="custom-select-action">' +
						(typeof options.onAdd === "function" ?
						'<button type="button" class="btn btn-primary btn-block add-button" ng-click="add()">{{addText}}</button>' : '') +
					'</div>' +
				'</div>';

			// Clear element contents
			elem.empty();

			// Create dropdown element
			var dropdownElement = angular.element(dropdownTemplate),
				anchorElement = dropdownElement.eq(0).dropdown(),
				inputElement = dropdownElement.eq(1).find(':text'),
				ulElement = dropdownElement.eq(1).find('ul');

			// Create child scope for input and dropdown
			var childScope = scope.$new(true);
			configChildScope();

			// Click event handler to set initial values and focus when the dropdown is shown
			anchorElement.on('click', function (event) {
				if (childScope.disabled) {
					return;
				}
				childScope.$apply(function () {
					lastSearch = '';
					childScope.searchTerm = '';
				});
				
				focusedIndex = -1;
				inputElement.focus();

				// If filter is not async, perform search in case model changed
				//if (!options.async) {
				//	getMatches();
				//}
			});
			
			if (dependsOn) {
				scope.$watch(dependsOn, function (newVal, oldVal) {
					if (newVal !== oldVal) {
						childScope.matches = [];
						childScope.select(undefined);
					}
				});
			}

			// Event handler for key press (when the user types a character while focus is on the anchor element)
			anchorElement.on('keypress', function (event) {
				if (!(event.altKey || event.ctrlKey)) {
					anchorElement.click();
				}
			});

			// Event handler for Esc, Enter, Tab and Down keys on input search
			inputElement.on('keydown', function (event) {
				if (!/(13|27|40|^9$)/.test(event.keyCode)) return;
				event.preventDefault();
				event.stopPropagation();

				switch (event.keyCode) {
					case 27: // Esc
						anchorElement.dropdown('toggle');
						break;
					case 13: // Enter
						selectFromInput();
						break;
					case 40: // Down
						focusFirst();
						break;
					case 9:// Tab
						anchorElement.dropdown('toggle');
						break;
				}
			});

			// Event handler for Up and Down keys on dropdown menu
			ulElement.on('keydown', function (event) {
				if (!/(38|40)/.test(event.keyCode)) return;
				event.preventDefault();
				event.stopPropagation();

				var items = ulElement.find('li > a');

				if (!items.length) return;
				if (event.keyCode == 38) focusedIndex--;                                    // up
				if (event.keyCode == 40 && focusedIndex < items.length - 1) focusedIndex++; // down
				//if (!~focusedIndex) focusedIndex = 0;

				if (focusedIndex >= 0) {
					items.eq(focusedIndex)
						.focus();
				} else {
					focusedIndex = -1;
					inputElement.focus();
				}
			});

			resetMatches();

			// Compile template against child scope
			$compile(dropdownElement)(childScope);
			elem.append(dropdownElement);

			// When model changes outside of the control, update the display text
			controller.$render = function () {
				setDisplayText();
			};

			// Watch for changes in the default display text
			childScope.$watch(getDisplayText, setDisplayText);

			childScope.$watch(function () { return elem.attr('disabled'); }, function (value) {
				childScope.disabled = value;
			});

			childScope.$watch('searchTerm', function (newValue) {
				if (timeoutHandle) {
					$timeout.cancel(timeoutHandle);
				}

				var term = (newValue || '').trim();
				timeoutHandle = $timeout(function () {
					getMatches(term);
				},
				// If empty string, do not delay
				(term && options.searchDelay) || 0);
			});

			if (!options.async) {
				var m = values.match(VALUES_REGEXP);
				if (m) {
					var originalValues = m[0];
					scope.$watchCollection(originalValues, function (value) {
						if (angular.isArray(value)) {

							getMatches();
						}
					});
				}
			}

			// Support for autofocus
			if ('autofocus' in attrs) {
				anchorElement.focus();
			}

			var needsDisplayText;
			function setDisplayText() {
				var locals = { };
				locals[valueName] = controller.$modelValue;
				var text = displayFn(scope, locals);

				if (text === undefined) {
					var map = matchMap[hashKey(controller.$modelValue)];
					if (map) {
						text = map.label;
					}
				}

				needsDisplayText = !text;
				childScope.displayText = text || options.displayText;
			}

			function getOptions() {
				return angular.extend({}, baseOptions, scope.$eval(attrs.customSelectOptions));
			}

			function getDisplayText() {
				options = getOptions();
				return options.displayText;
			}

			function focusFirst() {
				var opts = ulElement.find('li > a');
				if (opts.length > 0) {
					focusedIndex = 0;
					opts.eq(0).focus();
				}
			}

			// Selects the first element on the list when the user presses Enter inside the search input
			function selectFromInput() {
				var opts = ulElement.find('li > a');
				if (opts.length > 0) {
					var ngRepeatItem = opts.eq(0).scope();
					var item = ngRepeatItem[valueName];
					childScope.$apply(function () {
						childScope.select(item);
					});
					anchorElement.dropdown('toggle');
				}
			}

			function getMatches(searchTerm) {
				if (searchTerm === undefined) {
					searchTerm = (childScope.searchTerm || "").trim();
				}
				var locals = { $searchTerm: searchTerm }
				$q.when(valuesFn(scope, locals)).then(function (matches) {
					if (!matches) return;

					if (searchTerm === inputElement.val().trim()/* && hasFocus*/) {
						matchMap = {};
						childScope.matches.length = 0;
						for (var i = 0; i < matches.length; i++) {
							locals[valueName] = matches[i];
							var value = valueFn(scope, locals),
								label = displayFn(scope, locals);

							matchMap[hashKey(value)] = {
								value: value,
								label: label/*,
								model: matches[i]*/
							};

							childScope.matches.push(matches[i]);
						}
						//childScope.matches = matches;
					}

					if (needsDisplayText) setDisplayText();
				}, function() {
					resetMatches();
				});
			}

			function resetMatches() {
				childScope.matches = [];
				focusedIndex = -1;
			};

			function configChildScope() {
				childScope.addText = options.addText;
				childScope.emptySearchResultText = options.emptySearchResultText;
				childScope.emptyListText = options.emptyListText;

				childScope.select = function (item) {
					var locals = {};
					locals[valueName] = item;
					var value = valueFn(childScope, locals);
					//setDisplayText(displayFn(scope, locals));
					childScope.displayText = displayFn(childScope, locals) || options.displayText;
					controller.$setViewValue(value);

					anchorElement.focus();

					typeof options.onSelect === "function" && options.onSelect(item);
				};

				childScope.add = function () {
					$q.when(options.onAdd(childScope.searchTerm), function (item) {
						if (!item) return;

						var locals = {};
						locals[valueName] = item;
						var value = valueFn(scope, locals),
							label = displayFn(scope, locals);

						matchMap[hashKey(value)] = {
							value: value,
							label: label/*,
								model: matches[i]*/
						};

						childScope.matches.push(item);
						childScope.select(item);
					});
				};

				childScope.format = format;

				setDisplayText();
			}

			var current = 0;
			function hashKey(obj) {
				if (obj === undefined) return 'undefined';

				var objType = typeof obj,
					key;

				if (objType == 'object' && obj !== null) {
					if (typeof (key = obj.$$hashKey) == 'function') {
						// must invoke on object to keep the right this
						key = obj.$$hashKey();
					} else if (key === undefined) {
						key = obj.$$hashKey = 'cs-' + (current++);
					}
				} else {
					key = obj;
				}

				return objType + ':' + key;
			}
		}
	};
}]);