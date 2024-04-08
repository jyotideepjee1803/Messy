import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/mess',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Buy Coupon',
    path: '/buycoupon',
    icon: icon('ic_cart'),
  },
  {
    title: 'My Coupon',
    path: '/mycoupon',
    icon: icon('ic_user'),
  },
  {
    title : 'Notices',
    path: '/notices',
    icon: icon('ic_notice'),
  },
  {
    title: 'Feedback',
    path: '/feedback',
    icon: icon('ic_blog'),
  },
]
const AdminNavConfig=[
  {
    title: 'Admin Panel',
    path : "/admin",
    icon: icon('ic_lock'),
  },
  {
    title: 'Inventory ',
    path : "/inventory",
    icon: icon('ic_blog'),
  },
  {
    title: 'Compose Notice',
    path : '/compose',
    icon : icon('ic_note'),
  }
];

export {AdminNavConfig};
export default navConfig;
