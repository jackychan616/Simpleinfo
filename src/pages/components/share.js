import ShareIcon from '@mui/icons-material/Share';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function sharebox(){
    return(
        <div>
            <h1>123</h1>
            <Tooltip title="Share">
                <IconButton >
                    <ShareIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
}