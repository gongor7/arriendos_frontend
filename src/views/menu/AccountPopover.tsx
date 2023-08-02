
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';

import { useAuthStore } from '../../hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AccountPopover = ({ anchorEl, onClose, open }: { anchorEl: any, onClose: any, open: boolean }) => {

    const navigate = useNavigate();
    const { startLogout } = useAuthStore();
    const { data } = useSelector((state: any) => state.auth);

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    Cuenta
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {data.name}
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            ><MenuItem
            // onClick={handleSignOut}
            >
                    Cambiar contraseña
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        startLogout();
                        navigate('/admin');
                    }}
                >
                    Salir Sesión
                </MenuItem>
            </MenuList>
        </Popover>
    );
};