import * as React from 'react';

import * as Styles from "../../styles/modules/mainPanel.module.css"

const MainPanelComponent = ({ children }) => {

	return (
		<>
			<div className={Styles.mainContainer}>
				{ children }
			</div>
		</>
	)
}

export default MainPanelComponent