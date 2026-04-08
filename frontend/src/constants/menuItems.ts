import { Icons } from "./icons";

export const menuItems = [
  {
    titleKey: "menu.title-dashboard",
    url: "/dashboard/home",
    Icon: Icons.dashboard,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-student",
    url: "/dashboard/students",
    Icon: Icons.students,
    hasAccess: ["TEACHER"],
  },
  {
    titleKey: "menu.title-teacher",
    url: "/dashboard/teachers",
    Icon: Icons.teachers,
    hasAccess: ["STUDENT"],
  },
  {
    titleKey: "menu.title-calendar",
    url: "/dashboard/calendar",
    Icon: Icons.calendar,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-tasks",
    url: "/dashboard/tasks",
    Icon: Icons.tasks,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-chats",
    url: "/dashboard/chats",
    Icon: Icons.chats,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-whiteboards",
    url: "/dashboard/whiteboards",
    Icon: Icons.whiteboards,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-statistic",
    url: "/dashboard/statistic",
    Icon: Icons.statistic,
    hasAccess: ["TEACHER"],
  },
  {
    titleKey: "menu.title-files",
    url: "/dashboard/files",
    Icon: Icons.files,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-quizzes",
    url: "/dashboard/quizzes",
    Icon: Icons.quizz,
    hasAccess: ["STUDENT", "TEACHER"],
  },
  {
    titleKey: "menu.title-settings",
    url: "/dashboard/settings",
    Icon: Icons.gear,
    hasAccess: ["STUDENT", "TEACHER"],
  },
];
