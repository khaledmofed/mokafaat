export interface NavigationLinksProps {
  links: Array<{
    path: string;
    title: string;
    scroll: boolean;
    newTab: boolean;
  }>;
  t: (key: string) => string;
  handleCloseNavigation: () => void;
}
