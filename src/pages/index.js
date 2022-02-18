import * as React from "react"
import HomeComponent from "../components/home/HomeComponent"
import LayoutComponent from "../components/layout/LayoutComponent"
import "../styles/global.css"

// markup
const IndexPage = () => {
	return (
		<>
			<LayoutComponent>
				<HomeComponent></HomeComponent>
			</LayoutComponent>
		</>
	)

}

export default IndexPage
