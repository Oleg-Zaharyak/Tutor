import { BsPersonPlus } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { GoGear } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { BsGrid, BsList } from "react-icons/bs";
import { HiOutlineTrash, HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineQueryStats } from "react-icons/md";

import {
  TbPhotoCog,
  TbPhotoPlus,
  TbFaceIdError,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbChalkboard,
} from "react-icons/tb";

import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoGameControllerOutline,
  IoPeopleOutline,
  IoMenu,
  IoArrowBackOutline,
} from "react-icons/io5";

import {
  LuFileSpreadsheet,
  LuLayoutDashboard,
  LuListTodo,
} from "react-icons/lu";

export const Icons = {
  addPerson: BsPersonPlus, // Icon for adding a person to a task or project
  defaultUserImg: HiOutlineUserCircle, // Placeholder for user profile image
  cross: RxCross2, // Icon for closing modals, deleting items, or canceling actions
  plus: FiPlus, // Icon for adding new items, such as tasks, projects, or users
  gear: GoGear, // Icon for settings or configuration options
  arrowBack: IoArrowBackOutline, // Icon for navigating back to the previous page or view
  delete: HiOutlineTrash, // Icon for deleting items
  notFound: TbFaceIdError, // Icon for indicating a not found error

  openEye: IoMdEye, // Icon for showing hidden content, such as passwords or details
  closedEye: IoMdEyeOff, // Icon for hiding content, such as passwords or details

  uploadPhoto: TbPhotoPlus, // Icon for uploading a new photo
  editPhoto: TbPhotoCog, // Icon for editing photo settings or cropping

  grid: BsGrid, // Icon for switching to grid view in task or project lists
  list: BsList, // Icon for switching to list view in task or project lists
  menu: IoMenu, // Icon for opening the mobile menu or sidebar

  collapser: TbLayoutSidebarLeftCollapse, // Icon for collapsing
  expand: TbLayoutSidebarLeftExpand, // Icon for expanding

  // Icons for the dashboard menu
  dashboard: LuLayoutDashboard, // Icon for the main dashboard view
  students: IoPeopleOutline, // Icon for the students section
  teachers: IoPeopleOutline, // Icon for the teachers section
  calendar: IoCalendarOutline, // Icon for the calendar view
  tasks: LuListTodo, // Icon for the tasks section
  chats: IoChatbubblesOutline, // Icon for the chats section
  whiteboards: TbChalkboard, // Icon for the whiteboards section
  statistic: MdOutlineQueryStats, // Icon for the statistics and analytics section
  quizz: IoGameControllerOutline, // Icon for the quizzes and assessments section
  files: LuFileSpreadsheet, // Icon for the files and resources section
};
