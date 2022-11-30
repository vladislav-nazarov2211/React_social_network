import React, { useState } from "react";
import styles from './Paginator.module.css'

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)    
    let pages = []

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        let portionCount = Math.ceil(pagesCount / props.portionSize)
        let [portionNumber, setPortionNumber] = useState(1)
        let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
        let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div className={styles.wrapper}>
            <div className={styles.btns_pages}>
                {portionNumber > 1 &&
                <button className={`${styles.btns} ${styles.btnPrev}`} onClick={() => {setPortionNumber(portionNumber - 1)}}>Назад</button>}
                    {pages
                        .filter(item => item >= leftPortionPageNumber && item <= rightPortionPageNumber)
                        .map(item => 
                            <div className={styles.pageNumber} key={item}>
                                <div onClick={(e) => {props.onPageChanged(item, props.userPage.search)}} className={props.currentPage === item ? styles.selectedPage : ''}>{item}</div>
                            </div>    
                    )}
                {portionCount > portionNumber &&
                <button className={`${styles.btns} ${styles.btnNext}`} onClick={() => {setPortionNumber(portionNumber + 1)}}>Вперед</button>}
            </div>  
        </div> 
                                
    )
}



export default Paginator


