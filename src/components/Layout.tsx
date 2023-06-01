import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import Logo from '../assets/img/logo.png';
import Background from '../assets/img/background.png';
type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'repeat', backgroundSize: '250px 250px', height: '100%', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <div style={{ paddingTop: '4px', paddingBottom: '4px' }}>
                        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={Logo} alt="logo" height={70} style={{ marginRight: '10px' }} />
                            INGENIERIA ECONOMICA
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ marginTop: '2rem' }}>{children}</Container>
        </div>
    );
};

export default Layout;
