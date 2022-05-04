import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

const CustomDialog = ({ Show, HandleClose, HandleSave, children, title, Size, SaveTitle = "Save Changes", SaveVariant = "primary", CancelTitle = "Cancel", CancelVariant = "secondary" }) => {
    return (
        <Dialog open={Show} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {children ? children : null}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={HandleClose}>
                    {CancelTitle}
                </Button>
                <Button onClick={HandleSave}>{SaveTitle}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog