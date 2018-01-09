angular.module('googleChartWrap', [])
    .directive('googleChart', function () {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attr) {
            //watch the actual property since haveWantStats will point to a resource and exist almost immediately even prior to pulling the data.
            $scope.$watch($attr.data, function (value) {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'name');
                data.addColumn('number', 'votes');

                angular.forEach(value, function (row) {
                    data.addRow([row.name, row.votes]);
                });

                var options = {
                    title: $attr.title,
                    height: $attr.height,
                    width: $attr.width,
                    legend: 'bottom'
                };

                //render the desired chart based on the type attribute provided
                var chart;
                switch ($attr.type) {
                    case ('PieChart'):
                        chart = new google.visualization.PieChart($elm[0]);
                        break;
                    case ('ColumnChart'):
                        chart = new google.visualization.ColumnChart($elm[0]);
                        break;
                    case ('BarChart'):
                        chart = new google.visualization.BarChart($elm[0]);
                        break;
                    case ('Table'):
                        chart = new google.visualization.Table($elm[0]);
                        break;
                }
                chart.draw(data, options);
            });
        }
    }
});