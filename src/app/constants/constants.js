import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export const navLinks = [
  { name: "Prayer times", href: "/" },
  { name: "Allah Names", href: "/AllahNames" },
  { name: "Sunnah", href: "/Sunnah" },
  { name: "Qibla", href: "/qibla" },
];

export const sunnahLinks = [
  { name: "sahih albukhari", link: "/Sunnah/sahih-bukhari" },
  { name: "sahih Muslim", link: "/Sunnah/sahih-muslim" },
  { name: "Sunan An-Nasa`i", link: "/Sunnah/sunan-nasai" },
  {
    name: "Sunan Abu Dawood",
    link: "/Sunnah/abu-dawood",
  },
  {
    name: "Jami' Al-Tirmidhi",
    link: "/Sunnah/al-tirmidhi",
  },
  {
    name: "Sunan Ibn Majah",
    link: "/Sunnah/ibn-e-majah",
  },
  {
    name: "Musnad Ahmed",
    link: "/Sunnah/musnad-ahmad",
  },
];


export const socialMediaIcons = [{
  name : 'Facebook',
  icon : <FaFacebook className='text-blue-500' />,
  link : "https://www.facebook.com/Hb9Li/"
}
,{
  name : 'Instagram',
  icon : <FaInstagram className='text-red-500' />,
  link : "https://www.instagram.com/fer_ziad/"
},
{
  name : "What's app",
  icon : <FaWhatsapp className='text-green-500' />,
  link : "https://wa.me/213792926151"
} , {
  name : "Telegram",
  icon : <FaTelegram className='text-blue-500' />,
  link : "https://t.me/ferZiad8"
}
]