import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { Box, IconButton, Link, Typography } from '@mui/material';
import React from 'react';
import './Footer.css';

const Copyright = () => (
  <Typography variant="body2" color="text.secondary">
    {'Copyright © '}
    <Link href="#">Tattoos&nbsp;</Link>
    {new Date().getFullYear()}
  </Typography>
);

const Footer = () => (
  <Box className="footer">
    <Box className="footer-content">
      <Box className="footer-links">
        <Link color="text.secondary" href="#">
          Privacy Policy
        </Link>
        <Typography display="inline" className="separator">
          &nbsp;•&nbsp;
        </Typography>
        <Link color="text.secondary" href="#">
          Terms of Service
        </Link>
        <Copyright />
      </Box>
      <Box className="footer-social">
        <IconButton
          color="inherit"
          href="https://github.com/mui"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://x.com/MaterialUI"
          aria-label="Twitter"
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://www.linkedin.com/company/mui/"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

export default Footer;
