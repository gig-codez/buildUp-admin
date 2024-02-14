import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export interface ButtonActions {
    label: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined
    onClick: () => {}
}
// define dialog translation
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});
export default function CustomDialog({ open, actions, title, children, closeDialog }: { open: boolean, actions?: ButtonActions[], title: string, children?: any, closeDialog: any }) {
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    return (
        <React.Fragment>
            <Dialog
                fullWidth={maxWidth === 'xs' ? false : true}
                maxWidth={maxWidth}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <center>{title}</center>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                {
                    actions ? <DialogActions>
                        {
                            actions.map((action, index) => {
                                return <Button key={index} color={action.color} onClick={action.onClick}>{action.label}</Button>
                            })
                        }
                    </DialogActions> : <></>}
            </Dialog>
        </React.Fragment>
    );
}
