
import { useSpecefication } from '../hooks/useSpecefication';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import { StringMap } from '../utility/types'

const SpeceficationBlock: FC<{ setActiveSpecificationId: Dispatch<SetStateAction<string>> }> = ({ setActiveSpecificationId }) => {
    const [expanded, setExpanded] = useState<number | false>(false);
    const { specification } = useSpecefication();

    const handleChange = (id: number) => {
        setExpanded(prev=>{
            if(prev === id){
                return false
            }
            return id
        });
    };

    const clearFields = () => {
        setActiveSpecificationId('')
    }

    return (
        <Box
            sx={{
                display: 'block',
                m: 1,
                p: 1,
                fontSize: '0.875rem',
                fontWeight: '700',
                width: "700px",
                margin: '0 auto',
                overflowY: "auto"
            }}
        >
            <div>
                {specification &&
                    specification?.map((item: StringMap, id: number) => {
                        return (
                            <Accordion key={id} sx={{ marginBottom: '20px', cursor:"auto"}} expanded={expanded === id} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={() => { handleChange(id) }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Typography>
                                        {item?.name}
                                    </Typography>
                                    <IconButton onClick={(e) => { e.preventDefault(); setActiveSpecificationId(typeof item.id === 'string' ? item.id : '') }}>
                                        <EditIcon />
                                    </IconButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {Object.keys(item).map((key) => {
                                        return (
                                            <Typography key={key + item.id}>
                                                {`${key}:${item[key]}`}
                                            </Typography>
                                        )
                                    })}
                                </AccordionDetails>

                            </Accordion>
                        )
                    })
                }
                <Button sx={{ width: '300px', marginTop: "20px", display: specification.length !== 0 ? "block" : 'none' }} variant="contained" type="submit" onClick={clearFields}>Add new specification</Button>
            </div>
        </Box>
    )
}

export default SpeceficationBlock