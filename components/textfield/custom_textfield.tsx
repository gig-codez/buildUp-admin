import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CustomTextField({ label, error, onEdit, placeHolder, errorText, defaultValue }: { onEdit: any, defaultValue?: string, label: string, error?: boolean, placeHolder: string, errorText?: string }) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    fullWidth
                    error={error}
                    size='small'
                    placeholder={placeHolder}
                    id="outlined-error-helper-text"
                    label={label}
                    helperText={errorText}
                    defaultValue={defaultValue}
                    onChange={(e) => {
                        onEdit(e.target.value)
                    }}
                />
            </div>
        </Box>
    );
}
