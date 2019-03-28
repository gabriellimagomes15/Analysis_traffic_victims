// Age categories
var categories = ['0-4', '5-9', '10-14', '15-19',  '20-24', '25-29', '30-34', '35-39', '40-44',  
'45-49', '50-54', '55-59', '60-64', '65-69',  '70-74', '75-79', '80-84', '85-89', '90-94',  
'95-99', '100 + '];


function vitimas_times(id,data){
    Highcharts.chart(id, {
            chart: {
               borderWidth: 0
            },
            title: {
                text: ''
            },
            subtitle: {
                text: '<a href="https://www.prf.gov.br/portal/dados-abertos"> FONTE PRF </a>'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Qtd Vítimas'
                },
            },
            tooltip: {
              shared: true,
              valueSuffix: ' vitimas'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [
              {
                  name: 'Vítimas',
                  data:  data
              }
            ]
        });  
}

function vit_estado(id,data){
   Highcharts.mapChart(id, {
              chart: {
                  map: 'countries/br/br-all',
                  borderWidth: 0
              },
              title: {
                  text: ''
              },

              exporting: {
                  sourceWidth: 600,
                  sourceHeight: 300
              },
              mapNavigation: {
                  enabled: true
              },
              legend: {
                  layout: 'vertical',
                  align: 'left',
                  borderWidth: 0,
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  floating: true,
                  verticalAlign: 'bottom',
                 // y: 25
              },
              colorAxis: {
                  //min: 500,
                  //max: max + 500,
                  type: 'logarithmic',
                  stops: [
                      [0, '#ffe6e6'],
                      [0.5, '#ff4d4d'],
                      [1, '#330000']
                  ]
              },

              series: [{
                  animation: {
                      duration: 1000
                  },
                  data: data,
                  joinBy: ['postal-code', 'code'],
                  dataLabels: {
                      enabled: true,
                      color: '#FFFFFF',
                      format: '{point.code}'
                  },
                  name: 'Número Vítimas',
                  tooltip: {
                      pointFormat: '{point.postal-code}: {point.value}'
                  }
              }]

          });
}


function vit_sex_map(id,fem,masc){
   Highcharts.mapChart(id, {
            chart: {
                map: 'countries/br/br-all',
                spacingBottom: 20,
                borderWidth: 0
            },

            title: {
                text: ' '
            },
            subtitle:{
              text: 'Sexo das Vítimas (Maioria) por Estado '
            },

            legend: {
                enabled: true
            },
            
            mapNavigation: {
                  enabled: true
            },

            plotOptions: {
                map: {
                    allAreas: false,
                    joinBy: ['postal-code', 'code'],
                    dataLabels: {
                      enabled: true,
                      color: '#FFFFFF',
                      format: '{point.code}'
                    },
                    tooltip: {
                        pointFormat: '<b> {point.value} Vítimas</b> '
                    },
                    states: {
                      hover: {
                        color: Highcharts.getOptions().colors[2]
                      }
                    }
                }
            },
            series: [
              {
                  name: 'Masculino',
                  data: masc.data.map(function(x){ 
                    return {code: x.code,value:x.count} })
              }, {
                  name: 'Feminino',
                  color: Highcharts.getOptions().colors[5],
                  data: fem.data.map(function(x){ return {code: x.code,value:x.count} }),
              }
            ]
        });
}


function vit_idade_map(id,data){
  Highcharts.mapChart(id, {
              chart: {
                  map: 'countries/br/br-all',
                  borderWidth: 0
              },
              title: {
                  text: ''
              },
              exporting: {
                  sourceWidth: 600,
                  sourceHeight: 300
              },
              mapNavigation: {
                  enabled: true
              },
              legend: {
                  layout: 'vertical',
                  borderWidth: 0,
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  floating: true,
                  verticalAlign: 'bottom',
                  align: 'left',
              },
              colorAxis: {
                  type: 'logarithmic'
              },

              series: [{
                  animation: {
                      duration: 1000
                  },
                  data: data,
                  joinBy: ['postal-code', 'code'],
                  dataLabels: {
                      enabled: true,
                      color: '#FFFFFF',
                      format: '{point.code}'
                  },
                  name: 'Média Idade',
                  tooltip: {
                      //headerFormat: '',
                      pointFormat: '{point.postal-code}: {point.value:.2f}'
                  }
              }]

          });
}


function pie_chart(id, data){
  
    if (!Highcharts.charts.length) {
        Highcharts.setOptions({
            colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            })
        });
    }
    
        // Build the chart
        Highcharts.chart(id, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ' '
            },
            tooltip: {
                pointFormat: '{series.name}: <b> {point.y} ( {point.percentage:.1f}  % )</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                name: 'Qtd.',
                data: data.map(function(x){ return {name: x.value, y: x.count }})
            }]
        });
}


function time_sexo(id,data){
    Highcharts.chart(id, {
            chart: {
               borderWidth: 0
            },
            title: {
                text: ' '
            },
            subtitle: {
                text: ' '
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Qtd Vítimas'
                },
            },
            tooltip: {
              shared: true,
              valueSuffix: ' vitimas',
              crosshairs: true

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [
              {
                  name: 'Masculino',
                  data:  data.filter(function(x){ return x.name == 'Masculino' }).map(function(y){
                    return y.data
                  })[0]
              },
              {
                  name: 'Feminino',
                  data:  data.filter(function(x){ return x.name == 'Feminino' }).map(function(x){
                    return x.data
                  })[0]
              }
              
            ]
        });  
}

function piramide(id,data){
  Highcharts.chart(id, {
            chart: {
                type: 'bar'
            },
            title: {
                text: ' '
            },
            subtitle: {
                text: ' '
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', faixa etária ' + this.point.category + '</b><br/>' +
                        'Qtd.: ' + Math.abs(this.point.y);
                }
            },

            series: [{
                name: 'Masculino',
                data: data.filter(function(x){return x.name == 'Masculino'}).map(function(y){return y.data})[0]
            }, {
                name: 'Feminino',
                color: Highcharts.getOptions().colors[5],
                data: data.filter(function(x){return x.name == 'Feminino'}).map(function(y){return y.data})[0]

            }]
        });
}


function causa_acid_ano(id,data){
  console.log("EXEMPLO: ", data)

        Highcharts.chart(id, {
          chart: {
              type: 'bar'
          },
          title: {
              text: ' '
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: data.filter(function(x){ return Object.keys(x)[0] == "categories" }).map(function(x){ return x[Object.keys(x)]} )[0],
              title: {
                  text: null
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: ' Qtd. Vítimas',
                  align: 'high'
              },
              labels: {
                  overflow: 'justify'
              }
          },
          tooltip: {
              valueSuffix: ' Vítimas'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              //x: -40,
              y: 80,
              floating: true,
              borderWidth: 0,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },
          credits: {
              enabled: false
          },          
          series: data.filter(function(x){ return Object.keys(x)[0] != "categories"}).map(function(x){ return {name: Object.keys(x)[0], data: x[Object.keys(x)]}})
    })
}


function cluster_estado(id,dados){
  console.log('CLUSTER ESTADO')

    cluster_clean = d3.set( dados.cluster.map(function(d){ return d.cluster })).values().map(function(c){
                          r_data = []
                          r_desc = "<br> (" //[]
                                dados.cluster.map(function(x){
                                  if (x.cluster == c ){
                                    r_data.push({code: x.uf.toUpperCase()})
                                  }
                                })                                
                                dados.desc_cluster.map(function(d){
                                    d[c].map(function(dd){
                                      r_desc = r_desc + Object.keys(dd) +": " + dd[Object.keys(dd)] + " - "
                                    })
                                })
                          r_desc = r_desc + ")"

                          return {name: "Cluster: "+ c + r_desc, data:r_data}
                    })
    
        Highcharts.mapChart(id, {
            chart: {
                map: 'countries/br/br-all',
                spacingBottom: 20,
                borderWidth: 0
            },

            title: {
                text: ''
            },
            subtitle:{
              text: ''
            },
            legend: {
                enabled: true
            },            
            mapNavigation: {
                  enabled: true
            },
            plotOptions: {
                map: {
                    allAreas: true,
                    joinBy: ['postal-code', 'code'],
                    dataLabels: {
                      enabled: true,
                      color: '#FFFFFF',
                      format: '{point.code}'
                    },
                    tooltip: {
                      //headerFormat: '<b> Cluster: </b> {series.name} <br>',
                      pointFormat: ''
                    },
                    animation: {
                      duration: 1000
                    },
                    states: {
                        hover: {
                            color: '#9F0606', //Highcharts.getOptions().colors[2]
                            borderColor: 'gray'
                        }
                    },
                }
            },           
            series: cluster_clean

          });    
}
