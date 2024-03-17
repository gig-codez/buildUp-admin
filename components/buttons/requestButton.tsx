import React from 'react';
import {Button, CircularProgress, LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";

function RequestButton({onClick, disabled=false, loading=false, style, children}: {loading: boolean, children: React.ReactNode, onClick:  React.MouseEventHandler<HTMLButtonElement>, disabled?: boolean, style?:  React.CSSProperties}) {

    return (
        <span className="items-center justify-items-center">
            {loading?
                <Button
                    style={{
                        backgroundColor: "white"
                    }}
                    disabled={true}
                    variant="contained" size="small">
                    <Box style={{width: "100%"}} >
                        <LinearProgress color="success"/>
                    </Box>
                    </Button>:
                <Button
                    style={style??{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "5px",
                        margin: "15px",
                    }}
                    disabled={disabled}
                    variant="contained" onClick={onClick} size="small">
                    {children}
                </Button>}
        </span>
    );
}

export default RequestButton;