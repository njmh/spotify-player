import { Context } from "types";

export default function digestContext(contextData: any) : Context | null {
  if (!contextData) return null;
  
  const {
    uri,
    href,
    type,
  } = contextData;

  const context: Context = {
    uri,
    href,
    type,
  };

  return context;
}
