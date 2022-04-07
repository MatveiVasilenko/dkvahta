import React, {
    useState
} from 'react'
import IndTableBody from './IndTableBody';
import IndTableHead from './IndTableHead';
import IndTableBodyLisp from './IndTableBodyLisp';

const IndTable = ({
    classes,
    week,
    iventsData,
    setIventsData
}) => {
    const [iventItem, setIventItem] = useState({

    })
    return (
        <div className={classes.table}>
            <div>
                <div className={classes.tableHead__info}>
                    <div className={classes.tableHead__info__week}>День тижня</div>
                    <div className={classes.tableHead__info__day}>Час</div>
                </div>
                <IndTableBodyLisp 
                    classes={classes}
                    iventsData={iventsData}
                />
            </div>
            <div className={classes.tableBodyHead}>
                <IndTableHead 
                    classes={classes}
                    week={week}
                />
                <IndTableBody 
                    classes={classes}
                    iventsData={iventsData}
                    week={week}
                    iventItem={iventItem}
                    setIventItem={setIventItem}
                    setIventsData={setIventsData}
                />
            </div>
        </div>
    )
}
export default IndTable