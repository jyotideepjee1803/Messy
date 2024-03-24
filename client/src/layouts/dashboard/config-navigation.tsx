import SvgColor from '../../components/svg-color/svg-color';

// ----------------------------------------------------------------------

const icon = (name : string) => (
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
  }
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
  
];

export {AdminNavConfig};
export default navConfig;
