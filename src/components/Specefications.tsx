import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeceficationBlock from './SpecificationBlock';
import SpecificationForm from './SpeceficationForm';

const Specefications = () => {
    const [activeSpecificationId, setActiveSpecificationId] = useState<string>('')
    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    m: 1,
                    p: 10,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    height: '800px',
                    justifyContent: 'space-between'
                }}
            >
                <SpeceficationBlock setActiveSpecificationId={setActiveSpecificationId} />
                <SpecificationForm activeSpecificationId={activeSpecificationId} />

            </Box>
        </ >
    );
}

export default Specefications