import { useEffect, useState } from "react";

function useIsClient(): boolean {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  useEffect(() => {
    setIsClientSide(typeof window !== "undefined");
  }, []);

  return isClientSide;
}

export default useIsClient;
