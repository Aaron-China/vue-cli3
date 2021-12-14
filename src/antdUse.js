/* eslint-disable */
/**
 * 按需加载需要的antd组件
 */
import {
  Layout,
  Avatar,
  Input,
  InputNumber,
  Button,
  Radio,
  Checkbox,
  Select,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Dropdown,
  Breadcrumb,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Popconfirm,
  configProvider,
  Popover
} from "ant-design-vue";

const antdUse = (app) => {
  app.use(Layout);
  app.use(Avatar);
  app.use(Input);
  app.use(InputNumber);
  app.use(Button);
  app.use(Radio);
  app.use(Checkbox);
  app.use(Select);
  app.use(Form);
  app.use(Row);
  app.use(Col);
  app.use(Modal);
  app.use(Table);
  app.use(Tabs);
  app.use(Dropdown);
  app.use(Breadcrumb);
  app.use(Spin);
  app.use(Menu);
  app.use(Drawer);
  app.use(Tooltip);
  app.use(Tag);
  app.use(Divider);
  app.use(DatePicker);
  app.use(TimePicker);
  app.use(Upload);
  app.use(Popconfirm);
  app.use(configProvider);
  app.use(Popover);
};

export default antdUse;
