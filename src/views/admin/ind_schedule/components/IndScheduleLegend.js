import React from 'react'

const IndScheduleLegend = ({
    classes
}) => {
    return (
        <div className={classes.legend}>
            <div className={classes.legend__block}>
                <div className={classes.legend__item}>
                    <div className={[classes.legend__item__square, classes.legend__item__square_event].join(' ')}></div>
                    <div>Запланована подія</div>
                </div>
                <div className={classes.legend__item}>
                    <div className={[classes.legend__item__square, classes.legend__item__square_goodEvent].join(' ')}></div>
                    <div>Відвідування без порушень</div>
                </div>
                <div className={classes.legend__item}>
                    <div className={[classes.legend__item__square, classes.legend__item__square_badEvent].join(' ')}></div>
                    <div>Відвідування з порушеннями</div>
                </div>
            </div>
            <ul className={classes.legend__lisp}>
                <li>Наведіть курсором на початок чи кінець відвідування - щоб узнати, коли воно здійснилось</li>
                <li>Зробіть один клік по запланованої події щоб видалити її</li>
            </ul>
        </div>
    )
}
export default IndScheduleLegend