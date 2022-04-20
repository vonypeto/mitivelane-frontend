import {
  DashboardOutlined,
  SnippetsOutlined,
  ExceptionOutlined,
  UserOutlined,
  HomeOutlined,
  ApartmentOutlined,
  AuditOutlined,
  ShopOutlined,
  ReconciliationOutlined,
  DollarCircleOutlined,
  ContainerOutlined,
  MessageOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards-home",
        path: `${APP_PREFIX_PATH}//dashboards/home`,
        title: "sidenav.dashboard.home",
        icon: HomeOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-campaign",
        path: `${APP_PREFIX_PATH}//dashboards/campaign`,
        title: "sidenav.dashboard.campaign",
        icon: DollarCircleOutlined,
        breadcrumb: false,
        submenu: [],
      },
	  {
        key: "dashboards-chat",
        path: `${APP_PREFIX_PATH}//dashboards/chat`,
        title: "sidenav.dashboard.chat",
        icon: MessageOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const residentNavTree = [
  {
    key: "residents",
    path: `${APP_PREFIX_PATH}/residents`,
    title: "sidenav.residents",
    icon: DashboardOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "residents-information",
        path: `${APP_PREFIX_PATH}//residents/resident-information/list`,
        title: "sidenav.residents.information",
        icon: UserOutlined,
        breadcrumb: true,

        submenu: [],
      },
      {
        key: "residents-aid-assistant",
        path: `${APP_PREFIX_PATH}//residents/household`,
        title: "sidenav.residents.aid-assistant",
        icon: ApartmentOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "aid-assistant-list",
            path: `${APP_PREFIX_PATH}//residents/household/list`,
            title: "sidenav.residents.aid-assistant.list",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "aid-assistant-add",
            path: `${APP_PREFIX_PATH}//residents/household/archive`,
            title: "sidenav.residents.aid-assistant.add",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "aid-assistant-delete",
            path: `${APP_PREFIX_PATH}//residents/household/supply`,
            title: "sidenav.residents.aid-assistant.delete",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "aid-assistant-edit",
            path: `${APP_PREFIX_PATH}//residents/household/purok`,
            title: "sidenav.residents.aid-assistant.edit",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const blotterNavTree = [
  {
    key: "blotters",
    path: `${APP_PREFIX_PATH}/records`,
    title: "sidenav.reports",
    icon: SnippetsOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "blotters-information-list",
        path: `${APP_PREFIX_PATH}//records/blotter-record/list`,
        title: "sidenav.reports.blotter",
        icon: SnippetsOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "blotter.record",
            path: `${APP_PREFIX_PATH}//records`,
            title: "sidenav.reports.blotter.record",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "blotter.request",
            path: `${APP_PREFIX_PATH}//records/blotter-record/request`,
            title: "sidenav.reports.blotter.request",
            icon: "",
            breadcrumb: false,
            submenu: [],
          }
        ]
      },
      {
        key: "settlement-case-list",
        path: `${APP_PREFIX_PATH}//records/settlement`,
        title: "sidenav.reports.settlement",
        icon: ReconciliationOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "certificate-list",
        path: `${APP_PREFIX_PATH}//cert-display/list`,
        title: "sidenav.reports.certificate",
        icon: ContainerOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const settingrNavTree = [
  {
    key: "setting",
    path: `${APP_PREFIX_PATH}/records`,
    title: "sidenav.settings",
    icon: SnippetsOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "setting.audit",
        path: `${APP_PREFIX_PATH}//setting/audit`,
        title: "sidenav.setting.audit",
        icon: AuditOutlined,
        breadcrumb: true,
        // Remove AFTER DEVELOPMENT
        submenu: [],
      },
      {
        key: "setting.billing",
        path: `${APP_PREFIX_PATH}//setting/billing`,
        title: "sidenav.setting.billing",
        icon: ShopOutlined,
        breadcrumb: true,
        // Remove AFTER DEVELOPMENT
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...residentNavTree,
  ...blotterNavTree,

  ...settingrNavTree,
  // ...appsNavTree,
  // ...componentsNavTree,
  // ...extraNavTree,
  // ...docsNavTree,
];

export default navigationConfig;
