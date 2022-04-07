// @generated: @expo/next-adapter@2.1.5
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import Loader from './../loader/Loader';

const HighCharts = ({
    graficData,
    setGraficData,
    config
}) => {
    const [load, setLoad] = useState(false)
    const componentConfig = {
        title: {
            text: config.title
        },
        yAxis : {
            title: {
                text: config.yAxisTitle
            },
        },
        xAxis: {
            categories: graficData?.dates,
        },
        series: [
            { 
                data: graficData?.[config.xAxis],
                name: config.name,
                color: '#50895B',
                type: 'spline'
            }
        ],
        plotOptions: {
            series: {
                point: {
                events: {
                //   mouseOver: this.setHoverData.bind(this)
                }
            }
        }
        },
        hoverData: null
    }
    // const [isVarPie, setIsVarPie] = useState(componentConfig.varPie);
    useEffect(() => {
        if (graficData) {
            setLoad(true)
        }
    }, [graficData, setGraficData]);

    // if (graficData) return null;
    
    
    return (
        <div style={{width: '500px'}}>
            {load ? <HighchartsReact
                style={{width: '100%'}}
                highcharts={Highcharts}
                options={componentConfig}
              /> : <Loader />}
        </div>
    );
};

// HighChartsWeb.propTypes = {
//     componentConfig: PropTypes.object,
// };

export default HighCharts;
