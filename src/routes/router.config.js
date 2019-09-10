import Home from '../views/Home'
import Cart from "../views/Cart"
import Catagory from "../views/Catagory"
import List from "../views/List"
import Mine from "../views/Mine"
import Search from "../views/Search"
import Login from "../views/Login";
import Detail from "../components/Detail";
import Indexed from "../views/Indexed";
import NotFound from '../views/NotFound'
import Register from "../views/Register";
import Result from "../views/Result";
import Setting from "../views/Setting";
import Address from '../views/Mine/Address';
import Consignee from "../views/Mine/Consignee";

export const router = {
  ROUTER_LINK:[
    {
      to: "/index/home",
      name:'首页',
      icon: 'iconfont icon-shouye1'
    },
    {
      to: "/index/catagory",
      name: '分类',
      icon: 'iconfont icon-fenlei'
    },
    {
      to: "/index/cart",
      name: '购物车',
      icon: 'iconfont icon-gouwuche'
    },
    {
      to: "/index/mine",
      name: '我的',
      icon: 'iconfont icon-weibiaoti2fuzhi12'
    }
  ],
  ROUTER_VIEW: [
    {
      path: "/index",
      component: Indexed,
      children: [
        {
          path: "/index/home",
          component: Home
        },
        {
          path: "/index/catagory",
          component: Catagory
        },
        {
          path: "/index/cart",
          component: Cart,
          authorization: true
        },
        {
          path: "/index/mine",
          component: Mine,
          authorization: true // authorization 为 true 表示需要登录
        },
        {
          path: "/index/search",
          component: Search
        },
        {
          path: '/index/result',
          component: Result
        }
      ]
    },
    {
      path: "/detail",
      component: Detail
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/setting",
      component: Setting
    },
    {
      path: "/address",
      component: Address
    },
    {
      path: "/consignee",
      component: Consignee
    },
    {
      path:'*',
      component: NotFound
    }
  ]
};