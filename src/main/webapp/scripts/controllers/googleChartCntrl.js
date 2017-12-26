cams.controller('GenericChartCtrl', function ($scope,$location) {
    $scope.myChartObject = {};
    
    $scope.myChartObject.type = "BarChart";
    
    $scope.claimOpen = [
        {v: "attuid1489008468922"},
        {v: 19},
    ];

    $scope.myChartObject.data = {"cols": [
        {id: "t", label: "Claim ID", type: "string"},
        {id: "s", label: "Weeks", type: "number"}
    ], "rows": [
        {c: [
            {v: "TEST08201604050071"},
            {v: 13},
        ]},
        {c: $scope.claimOpen},
        {c: [
            {v: "attuid1489006903439"},
            {v: 20}
        ]},
        {c: [
            {v: "attuid1489006662607"},
            {v: 12},
        ]},
        {c: [
            {v: "TEST08201604050076"},
            {v: 16},
        ]}
    ]};

    $scope.myChartObject.options = {
        'title': 'Claims open for most number of weeks'
    };
    
    $scope.seriesSelected = function(selectedItem) {
		console.log($scope.myChartObject.data.rows[selectedItem.row].c[0].v);
		$location.path('/enterClaim/'+$scope.myChartObject.data.rows[selectedItem.row].c[0].v);
	}
});

cams.controller('HideSeriesController', HideSeriesController);

HideSeriesController.$inject = ['$scope'];

function HideSeriesController($scope) {
    // Properties
    $scope.myChartObject = {};

    //Methods
    $scope.hideSeries = hideSeries;
    
    init();

    function hideSeries(selectedItem) {
        var col = selectedItem.column;
        if (selectedItem.row === null) {
            if ($scope.myChartObject.view.columns[col] == col) {
                $scope.myChartObject.view.columns[col] = {
                    label: $scope.myChartObject.data.cols[col].label,
                    type: $scope.myChartObject.data.cols[col].type,
                    calc: function() {
                        return null;
                    }
                };
                $scope.myChartObject.options.colors[col - 1] = '#CCCCCC';
            }
            else {
                $scope.myChartObject.view.columns[col] = col;
                $scope.myChartObject.options.colors[col - 1] = $scope.myChartObject.options.defaultColors[col - 1];
            }
        }
    }

    function init() {
        $scope.myChartObject.type = "LineChart";
        $scope.myChartObject.displayed = false;
        $scope.myChartObject.data = {
            "cols": [{
                id: "month",
                label: "Month",
                type: "string"
            }, {
                id: "laptop-id",
                label: "Laptop",
                type: "number"
            }, {
                id: "desktop-id",
                label: "Desktop",
                type: "number"
            }, {
                id: "server-id",
                label: "Server",
                type: "number"
            }, {
                id: "cost-id",
                label: "Shipping",
                type: "number"
            }],
            "rows": [{
                c: [{
                    v: "January"
                }, {
                    v: 19,
                    f: "42 items"
                }, {
                    v: 12,
                    f: "Ony 12 items"
                }, {
                    v: 7,
                    f: "7 servers"
                }, {
                    v: 4
                }]
            }, {
                c: [{
                    v: "February"
                }, {
                    v: 13
                }, {
                    v: 1,
                    f: "1 unit (Out of stock this month)"
                }, {
                    v: 12
                }, {
                    v: 2
                }]

            }, {
                c: [{
                    v: "March"
                }, {
                    v: 24
                }, {
                    v: 5
                }, {
                    v: 11
                }, {
                    v: 6
                }]
            }]
        };
        $scope.myChartObject.options = {
            "title": "Sales per month",
            "colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
            "defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Sales unit",
                "gridlines": {
                    "count": 10
                }
            },
            "hAxis": {
                "title": "Date"
            }
        };

        $scope.myChartObject.view = {
            columns: [0, 1, 2, 3, 4]
        };
    }
};

cams.controller("PieChartCtrl", function ($scope,$location) {

    $scope.myChartObject = {};
    
    $scope.myChartObject.type = "PieChart";
    
    $scope.John = [
        {v: "John"},
        {v: 19},
    ];

    $scope.myChartObject.data = {"cols": [
        {id: "t", label: "Person", type: "string"},
        {id: "s", label: "Claims", type: "number"}
    ], "rows": [
        {c: [
            {v: "Dan"},
            {v: 13},
        ]},
        {c: $scope.John},
        {c: [
            {v: "Olivia"},
            {v: 23}
        ]},
        {c: [
            {v: "Steve"},
            {v: 17},
        ]},
        {c: [
            {v: "Rob"},
            {v: 21},
        ]}
    ]};

    $scope.myChartObject.options = {
        'title': 'Admins with most open claims'
    };
    
	$scope.seriesSelected = function(selectedItem) {
		console.log("handled the click event on Pie Chart")
//		 console.log($scope.myChartObject.data.rows[selectedItem.row].c[1].v);
//	     var col = selectedItem.column;
//	     console.log($scope.myChartObject.data.rows[selectedItem.row].c);
//	     console.log(selectedItem.row)
	     
	}
});

cams.controller("GaugeChartCtrl", function($scope) {

	$scope.myChartObject = {
			  "type": "AreaChart",
			  "displayed": false,
			  "data": {
			    "cols": [
			      {
			        "id": "month",
			        "label": "Month",
			        "type": "string",
			        "p": {}
			      },
			      {
			        "id": "laptop-id",
			        "label": "Laptop",
			        "type": "number",
			        "p": {}
			      },
			      {
			        "id": "desktop-id",
			        "label": "Desktop",
			        "type": "number",
			        "p": {}
			      },
			      {
			        "id": "server-id",
			        "label": "Server",
			        "type": "number",
			        "p": {}
			      },
			      {
			        "id": "cost-id",
			        "label": "Shipping",
			        "type": "number"
			      }
			    ],
			    "rows": [
			      {
			        "c": [
			          {
			            "v": "January"
			          },
			          {
			            "v": 19,
			            "f": "42 items"
			          },
			          {
			            "v": 12,
			            "f": "Ony 12 items"
			          },
			          {
			            "v": 7,
			            "f": "7 servers"
			          },
			          {
			            "v": 4
			          }
			        ]
			      },
			      {
			        "c": [
			          {
			            "v": "February"
			          },
			          {
			            "v": 13
			          },
			          {
			            "v": 1,
			            "f": "1 unit (Out of stock this month)"
			          },
			          {
			            "v": 12
			          },
			          {
			            "v": 2
			          }
			        ]
			      },
			      {
			        "c": [
			          {
			            "v": "March"
			          },
			          {
			            "v": 24
			          },
			          {
			            "v": 5
			          },
			          {
			            "v": 11
			          },
			          {
			            "v": 6
			          }
			        ]
			      }
			    ]
			  },
			  "options": {
			    "title": "Sales per month",
			    "isStacked": "true",
			    "fill": 20,
			    "displayExactValues": true,
			    "vAxis": {
			      "title": "Sales unit",
			      "gridlines": {
			        "count": 10
			      }
			    },
			    "hAxis": {
			      "title": "Date"
			    }
			  },
			  "formatters": {}
			}

  });