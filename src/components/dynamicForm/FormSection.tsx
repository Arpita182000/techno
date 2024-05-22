import { IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import colorConfigs from '../../configs/colorConfigs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// Reusable Form Section Component
const FormSection = ({ children, sectionTitle, onSave }: any) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandCollapse = () => {
        setExpanded((expanded) => !expanded);
        console.log("calling expand", expanded);


    };



    return (
        <div >
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: colorConfigs.primaryColor.red[600] }}>
                    {sectionTitle}
                </Typography>
                
                {expanded ?
                    (
                    <IconButton onClick={handleExpandCollapse} >
                        <ExpandLessIcon />
                    </IconButton>
                    )
                    : (
                        <IconButton onClick={handleExpandCollapse}>
                            <ExpandMoreIcon />
                           
                        </IconButton>

                    )

                }



            </div>

            <hr className="horizontal-line" />
            {expanded && children}
        </div>
        // <Accordion expanded={expanded} onChange={handleExpand} >
        //   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        //     <Typography>{sectionTitle}</Typography>
        //   </AccordionSummary>
        //   <AccordionDetails>
        //     {children}
        //   </AccordionDetails>
        // </Accordion>
    );
};

export default FormSection;




