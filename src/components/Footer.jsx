import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 4,
                py: 3,
                px: 2,
                backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]),
            }}>
            <Container maxWidth="md">
                <Typography align="center" variant="body1">
                    Made with ❤️ by <a target="_blank" rel="noreferrer" href="https://ivan-rodrigues.com">Ivan Rodrigues</a>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
