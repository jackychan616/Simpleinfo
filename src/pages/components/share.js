import ShareIcon from '@mui/icons-material/Share';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import { useDisclosure } from '@mantine/hooks';

export default function Sharebox(){
    return(
            <Box sz={{flexGrow:1}}>
                <Grid container spacing={8}>
                    <Grid xs={8}></Grid>
                    <Grid xs={2}>

                        <Tooltip title="Share" >
                            <IconButton >
                                <ShareIcon color='primary'/>
                            </IconButton>
                        </Tooltip>

                        
                    </Grid>
                    
                </Grid>
            </Box>
            

    );
}