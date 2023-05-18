import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import TabPanel from "./TabPanel";

export interface ITabs {
	label: string;
	content: JSX.Element;
}

interface ITabMenuProps {
	tabs: ITabs[];
}

function TabMenu({ tabs }: ITabMenuProps) {
	const [ value, setValue ] = React.useState(0);

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ backgroundColor: "#2E8B4C", width: "300px", minHeight: "100vh", flexShrink: 0 }}>
			<Tabs sx={{ borderBottom: 1, borderColor: 'divider' }} value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
				{tabs.map((tab, index) => (
					<Tab key={`tab-header-${index}`} label={tab.label} style={{ color: "white" }} {...a11yProps(index)} wrapped />
				))}
			</Tabs>
			{tabs.map((tab, index) => (
				<TabPanel key={`tab-content-${index}`} value={value} index={index}>
					{tab.content}
				</TabPanel>
			))}
		</Box>
	);
}
export default TabMenu;
