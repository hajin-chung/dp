export const parseCookies = (str: string) => {
  // str = [name]=[value]; [name]=[value]; [name]=[value]; [name]=[value];  ...
  const cookieMap: Record<string, string | undefined> = {};
  str.split(";").map(e => e.trim()).forEach(e => {
    const [name, value] = e.split("=");
    cookieMap[name] = value;
  });

  return cookieMap;
}