export type ToggleSidebarType = {
  isSidebarOpen: boolean;
  view: string;
  handleSidebar: () => void;
  handleView: (type: any) => void;
};
