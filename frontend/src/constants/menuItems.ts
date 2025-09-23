import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoGameControllerOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { TbChalkboard } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { MdOutlineQueryStats } from "react-icons/md";
import { LuFileSpreadsheet, LuLayoutDashboard } from "react-icons/lu";

export const menuItems = [
  {
    titleKey: "menu.title-dashboard",
    url: "/dashboard/home",
    Icon: LuLayoutDashboard,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-student",
    url: "/dashboard/students",
    Icon: IoPeopleOutline,
    hasAccess: ["TEACHER"],
  },
  {
    titleKey: "menu.title-teacher",
    url: "/dashboard/teachers",
    Icon: IoPeopleOutline,
    hasAccess: ["STUDENT"],
  },
  {
    titleKey: "menu.title-calendar",
    url: "/dashboard/calendar",
    Icon: IoCalendarOutline,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-chats",
    url: "/dashboard/chats",
    Icon: IoChatbubblesOutline,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-whiteboards",
    url: "/dashboard/whiteboards",
    Icon: TbChalkboard,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-statistic",
    url: "/dashboard/statistic",
    Icon: MdOutlineQueryStats,
    hasAccess: ["TEACHER"],
  },
  {
    titleKey: "menu.title-files",
    url: "/dashboard/files",
    Icon: LuFileSpreadsheet,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-quizzes",
    url: "/dashboard/quizzes",
    Icon: IoGameControllerOutline,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-settings",
    url: "/dashboard/settings",
    Icon: GoGear,
    hasAccess: ["STUDENT", "TEACHER"],
  },
];
