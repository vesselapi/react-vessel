import { useEffect, useState } from 'react';
import useScript from 'react-script-hook';

import { ClientConfig } from './types';

export default function useVesselLink(config: ClientConfig) {
  const [loading, error] = useScript({
    src: 'https://cdn.vessel.land/init.js',
    checkForExisting: true,
  });

  const [popupLoaded, setPopupLoaded] = useState(false);

  useEffect(() => {
    if (window.Vessel) {
      window.Vessel.init({
        ...config,
        onLoad: () => {
          setPopupLoaded(true);
          config.onLoad && config.onLoad();
        },
        onClose: () => config.onClose && config.onClose(),
      });
    }
  }, [loading]);

  const open = ({
    linkToken,
    integrationId,
  }: {
    linkToken: string;
    integrationId?: string;
  }) => {
    if (popupLoaded && !error && window.Vessel) {
      window.Vessel.open({ integrationId, linkToken });
    }
  };

  return {
    error,
    open,
    loading: !popupLoaded,
  };
}
