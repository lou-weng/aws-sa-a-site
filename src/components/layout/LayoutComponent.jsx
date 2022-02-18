import * as React from 'react';

import * as Styles from "../../styles/modules/layout.module.css"
import MainPanelComponent from '../mainPanel/MainPanelComponent';
import NavComponent from '../nav/NavComponent';

const LayoutComponent = ({ children }) => {
    return(
        <>
            <div className={Styles.layoutContainer}>
                <NavComponent></NavComponent>
                <MainPanelComponent>
                    { children }
                </MainPanelComponent>
            </div>
        </>
    )
}

export default LayoutComponent