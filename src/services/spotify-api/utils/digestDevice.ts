import { Device } from "types";

export default function digestDevice(deviceData: any) : Device | null {
  if (!deviceData) return null;

  const {
    id,
    name,
    type,
    is_active: active,
    volume_percent: volume,
  } = deviceData;

  const device: Device = {
    id,
    name,
    type,
    active,
    volume,
  };

  return device;
}
