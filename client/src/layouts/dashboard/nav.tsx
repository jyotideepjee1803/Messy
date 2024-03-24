import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import PropTypes from 'prop-types';

import { usePathname } from '../../routes/hooks/use-pathname';
import RouterLink from '../../routes/components/router-link';

import { useResponsive } from '../../hooks/use-responsive';

import Logo from '../../components/logo/logo';
import Scrollbar from '../../components/scrollbar/scrollbar';

import { NAV } from './config-layout';
import navConfig, { AdminNavConfig } from './config-navigation';

interface NavProps {
  openNav?: boolean;
  onCloseNav?: () => void;
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") as string);
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav && onCloseNav();
    }
  }, [pathname, openNav, onCloseNav]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar alt={loggedInUser.name}>
        {loggedInUser.name.charAt(0).toUpperCase()}
      </Avatar>

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{loggedInUser.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {loggedInUser.isAdmin ? 'Admin' : 'Student'}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
      {loggedInUser.isAdmin && AdminNavConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav || false}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

interface NavItemProps {
  item: {
    path: string;
    title: string;
    icon: React.ReactNode;
  };
}

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 600,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
