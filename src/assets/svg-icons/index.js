/**
 * Created by zonebond on 2017/3/31.
 */

/**
 const fs = require('fs');
 const path = require('path');

 const url = './';

 function resolveName(name) {
  let words = name.split(' ');
  words = words.map(word => {
    const [cap, ...least] = [...word];
    return [cap.toUpperCase(), ...least].join('');
  });
  return words.join('');
}

 fs.readdir(url, (err, files) => {
  if (err) return;
  let imports = [], exports = [];
  files.forEach(file => {
    if (path.extname(file) === '.svg') {
      const name = resolveName(path.basename(file, '.svg'));

      imports.push(`import ${name} from \'./${file}\'`);
      exports.push(`${name}`);
    }
  })
  console.log(imports.join('\n'));
  console.log(`export \{${exports.join(',\n')}\}`);
});
 */


import Active from './active.svg'
import Birthday from './birthday.svg'
import ConsumerFrequency from './consumer-frequency.svg'
import ConsumerTotal from './consumer-total.svg'
import Crown from './crown.svg'
import Discount from './discount.svg'
import Done from './done.svg'
import GoodOutline from './good-outline.svg'
import Good from './good.svg'
import GroupOutlie from './group-outlie.svg'
import Group from './group.svg'
import List from './list.svg'
import Loading from './loading.svg'
import NoPhoto from './no-photo.svg'
import Order from './order.svg'
import PersonAdd from './person-add.svg'
import PersonOutline from './person-outline.svg'
import Person from './person.svg'
import PhoneOutline from './phone-outline.svg'
import Score from './score.svg'
import ShoppingCart from './shopping-cart.svg'
import SmsOutline from './sms-outline.svg'
import Sms from './sms.svg'
import StarAttention from './star-attention.svg'
import StarNotAttention from './star-not-attention.svg'
import GroupGuid from './group-guide.svg'
import StarOutline from './star-outline.svg'
import Star from './star.svg'
import TrendingUp from './trending-up.svg'
import Trumpet from './trumpet.svg'
import TrumpetOutline from './trumpet-outline.svg'
import VerifiedUser from './verified-user.svg'
import VipCard from './vip-card.svg'
import Coupon from './coupon.svg'
import Circle from './circle.svg'
import Report from './report.svg'
import Calendar from './calendar.svg'
import Rank from './rank.svg'
import Arrowdown from './arrowdown.svg'
import defaultAvatar from './defaultAvatar.svg'

const Icons = {
  Active,
  Birthday,
  ConsumerFrequency,
  ConsumerTotal,
  Crown,
  Discount,
  Done,
  GoodOutline,
  Good,
  GroupOutlie,
  GroupGuid,
  Group,
  List,
  Loading,
  NoPhoto,
  Order,
  PersonAdd,
  PersonOutline,
  Person,
  PhoneOutline,
  Score,
  ShoppingCart,
  SmsOutline,
  Sms,
  StarAttention,
  StarNotAttention,
  StarOutline,
  Star,
  TrendingUp,
  Trumpet,
  TrumpetOutline,
  VerifiedUser,
  VipCard,
  Coupon,
  Circle,
  Report,
  Calendar,
  Rank,
  Arrowdown,
  defaultAvatar
};

export default Icons;
