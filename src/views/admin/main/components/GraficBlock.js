import React, {
    useState, useEffect
} from 'react' 
import HighCharts from '../../../../widgets/highcharts/HighCharts'
import { getData } from './../../../../common/utils';
import NET from './../../../../network';

const GraficBlock = ({
    classes
}) => {
    const [graficData, setGraficData] = useState(false)
    useEffect(() => {
        (async () => {
            const time = new Date();
            const year = time.getFullYear()
            const day = String(time.getDate()).length === 1 ? '0' + String(time.getDate()) : String(time.getDate())
            const month = String(time.getMonth() + 1).length === 1 ? '0' + String(time.getMonth() + 1) : String(time.getMonth() + 1)
            
            const data = await getData(`${NET.APP_URL}/statistic?month=${month}&day=${day}&year=${year}`)
            setGraficData(data.data)
        })()
    }, [])
    return (
        <div style={{display: 'flex'}}>
            <HighCharts 
                graficData={graficData}
                setGraficData={setGraficData}
                config={{
                    title: 'Кількість відвідувань за день',
                    yAxisTitle: 'Кількість відвідувачів',
                    xAxis: 'statsAll',
                    name: 'Усього за день'
                }}
            />
            <div className={classes.counter}>
                <div className={classes.counter__title}>Кількість відвідувачів зараз</div>
                <div className={classes.counter__value}>{graficData && graficData.statsNow && graficData.statsNow}</div>    
            </div>     
        </div>
    )
}
export default GraficBlock