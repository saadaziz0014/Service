import os from "os";
export const getTime = () => {
  const time = Date.now();
  const date = new Date(time);
  return date;
};

export const getLocalIP = () => {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    const interf = interfaces[interfaceName];

    for (const iface of interf) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }

  return null;
};
