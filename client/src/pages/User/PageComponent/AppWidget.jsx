import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppWidget({ loading, title, time, icon, color = 'primary', sx, ...other }) {

  const date = new Date(time);
  let istTime = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata"
  })
  const amPm = istTime.slice(-2);
  istTime = istTime.split(':').slice(0, 2).join(':');

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {!loading ? (icon && <Box sx={{ width: 64, height: 64, borderRadius: 4}}>{icon}</Box>) : <Skeleton animation="wave" variant="circular" width={64} height={64} />}

      <Stack spacing={0.5}>
        {!loading ? (<Typography variant="h4">{`${istTime} ${amPm}`}</Typography> ) : <Skeleton animation="wave" variant="rectangular" width={100} height={40} />}

        {!loading ? (
          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            {title}
          </Typography>
          ) : <Skeleton animation="wave" variant="rectangular" width={100} height={20} />
        }
      </Stack>
    </Card>
  );
}

AppWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
