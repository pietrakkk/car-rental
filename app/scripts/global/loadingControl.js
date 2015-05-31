angular.module('CarRentalApp').directive('loadingControl', LoadingControl);

function LoadingControl() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="text-center"><i class="glyphicon glyphicon-repeat fa-spin"/> Processing...</div>',
        link: function (scope, element, attr) {
            scope.$watch(attr.loader, function (val) {
                if (val) {
                    $(element).show();
                } else {
                    $(element).hide();
                }
            });
        }
    };
}