export function setNavItem(items: Array<string>, pathname: string) {
  for (let i = 0; i < items.length; i++) {
    if (items[i] === pathname || items[i] + "/" === pathname) return i;
  }
  return 0;
}
