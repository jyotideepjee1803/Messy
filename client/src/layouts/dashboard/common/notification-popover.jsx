import { useState } from 'react';
import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from '../../../utils/format-time';

import Iconify from '../../../components/iconify/iconify';
import Scrollbar from '../../../components/scrollbar';

import { useDispatch,useSelector } from "react-redux";
import { setNewNotifications,selectAppState } from '../../../store/AppSlice';
import axios, { getAxiosConfig } from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
    
    const {newNotifications} = useSelector(selectAppState);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({loggedInUser});

    const dispatch = useDispatch();
    // const [notifications, setNotifications] = useState(newNotifications);
    const totalUnRead = newNotifications.length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    dispatch(setNewNotifications([]));
  };

  const persistUpdatedUser = (updatedUser) => {
    // localStorage persists updated user even after page refresh
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    // dispatch(setLoggedInUser(updatedUser));
  };

  const handleMarkOneAsRead = async(notification) =>{
    const updatedNotifs = newNotifications.filter((item) => item._id !== notification._id)
    dispatch(setNewNotifications(updatedNotifs));

    const userNotifs = loggedInUser.notifications.filter((item) => item !== notification._id);

    const updatedUser = {
      ...loggedInUser,
      notifications : userNotifs
    }
    // console.log(updatedUser);
    await axios.put(`/api/user/${loggedInUser._id}/notifications/seen`,{notificationId: notification._id},config)
    persistUpdatedUser(updatedUser);
  }

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
          >
            {newNotifications.map((notification,index) => (
              <NotificationItem key={index} notification={notification} markAsRead={handleMarkOneAsRead}/>
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    seen: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification, markAsRead}) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.seen && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={()=>{
        markAsRead(notification)
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.subject}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.body.slice(0,20)}...
      </Typography>
    </Typography>
  );

  return {
    avatar: null,
    title,
  };
}