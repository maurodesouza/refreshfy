import { useState, useEffect } from 'react';

type ClientSideOnlyProps = {
  children: React.ReactNode;
};

const ClientSideOnly = ({ children }: ClientSideOnlyProps) => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => setClientSide(true), []);

  return clientSide && <>{children}</>;
};

export { ClientSideOnly };
