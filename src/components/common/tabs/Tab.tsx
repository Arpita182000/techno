import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TabData {
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  value: number,
  handleTabSwitch: Function;
  tabs: TabData[];
  children?: React.ReactNode;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index} `,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs({ tabs, value, handleTabSwitch }: CustomTabsProps) {
  // const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    handleTabSwitch(newValue);
  };

  return (
    <Box sx={{ width: '100%',background:"white",borderRadius:"10px",boxShadow:"5",}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:"15px" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}  >
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}