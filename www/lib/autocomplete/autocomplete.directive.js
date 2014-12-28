angular.module('autocomplete.directive', [])

.directive('ioncAutocomplete',
    function ($ionicPopover) {
        var popoverTemplate = [
         '<ion-popover-view>',
             '<ion-content>',
                 '<div class="list">',
                    '<a href="#" class="item" ng-repeat="item in items | filter:inputSearch" ng-click="selectItem(item)">{{item.display}}</a>',
                 '</div>',
             '</ion-content>',
         '</ion-popover-view>'
         ].join('');
        return {
            restrict: 'A',
            scope: {
                params: '=ioncAutocomplete',
                inputSearch: '=ngModel'
            },
            link: function ($scope, $element, $attrs) {
                var popoverShown = false;
                var popover = null;
                $scope.items = $scope.params.items;
                popover = $ionicPopover.fromTemplate(popoverTemplate, {
                    scope: $scope
                });
                $element.on('focus', function (e) {
                    if (!popoverShown) {
                        popover.show(e);
                    }
                })

                $scope.selectItem = function (item) {
                    $element.val(item.display);
                    popover.hide();
                    $scope.params.onSelect(item);
                }
            }
        }
    }
)
