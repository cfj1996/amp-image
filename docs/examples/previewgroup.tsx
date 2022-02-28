/* eslint-disable global-require */
import * as React from 'react';
import Image from 'amp-image';
import '../../assets/index.less';

export default function PreviewGroup() {
  return (
    <div>
      <Image.PreviewGroup>
        <Image
          wrapperStyle={{ marginRight: 24, width: 200 }}
          src={
            'https://lh3.googleusercontent.com/3Xgv60gX2U9umLrxk_p5chbPbVJFEOJOWpeZiK-S_maU2Jr4J1KrkToQCAjM8uOdBS75ezbxkyTtFwGR2HAjoAlLqbVLA0ZsJV3TrPz_iAziiewJFseJZ2Ok5E-OyZlYRjL2WlrBgHRz6SuiPabX22caq6o5q7DCMtddg0r0swhDZk3Ys-6ZmaKcSLDD8tN1D06zRHCQrj8LwiYwiYsqMNWSjF2NbpQfO3btbiBFXY1FHbbUrMbcGYLrsqOWlXQZ_vzeUkuFML3vXUDZBd5fMhXdgc9phGXFJqnTxsS-P9LUuxZrdBnihMGL7vKzIX3VIJFAcEOINGXhIhKyQhfGQmCBEXq72GhIyprgVIKy-4r2gRs_9-azh_R0_rItXpNpjLaKe2W-ktqGk3W8ctoZelCiRAl76Psiz6VuXjv0TcHas8yk0_ytMH5Ei7crM-ozTPSjYzwo-EA2GCuhVLtwf4Jq26wrNbPEurJvzB9zwizYQR28LnwSbb7DlGgV154Jt2WNdJFfo-P8anyLBNK4nK5sbIHmvJLii32Or7KUD4fSpAxba6WqkcTTxzbU3VxwHsSIN2omewo12ASR8j-STWLDzp19a9NPFRSO6wz640Fe4D1WFczQxKBTpD2jyvff5s-rErjKF3wQQtQCyQnTzfQ1L9wHCvOqzhd_16ZkcWG_Fe75wAEXEDO63Tn5fsWmADgchklKgp1sDBEpBoBAa1U=w3000-h1687-no?authuser=0'
          }
          preview={{
            descComponent: <div>这是第2个详情</div>,
          }}
        />
        <Image
          wrapperStyle={{ marginRight: 24, width: 200 }}
          isHide={true}
          src={
            'https://lh3.googleusercontent.com/b9QcQf-hWDXIw2f7xxKy-CNomBxYRvAZU-9obaNboZc2J3reBvwm42T6jM01r36m4cHpnXK-7V97m5dh0Yje4DUXpTWI_oUoSMPtDcysz_JJ92G4JTU3zUxizF3wbKnL6bz1tG1bsvlLlktpk7mwFBj_zAH9VK-j57gBonWtJ85Z04VWwPT3uMPJz5auvLg0NnDv-H8YLewchsbFG3xsgcZOyoLmwQz9hdzOK9_YNXbHWqZO9rWSyuXqObMx6DDxWGNUT4yWWUGW_EG0PuR7RaWWp7VjwEAOuGVDfdt5NWuSnKcaNEsOP5Ls86L_e1r0BtZWiJrWhIiXAGNEX3PtWN0sF9XmjPO6AELhyNmKpdgi7QGtMB47StXd-0rfGInvmLBg66wMCkhFXF-uja-jjYDt2M8VMT5r1A79GfJj4IJKPGgZ495O3Wjnz17f4u8I8Kl58SaRiv1Zcvr2tOffxmoDrLZRxtbapVymuLxahGbqN5-4DzqdlRe41pCjCDd0XOYHO6aCexfRJQDBwU9ouZyA2YcZeFmGeMujAascIG5Xel7fhN3zMhOEggFPhlzvb2Gi9bIFzI8P1H_lBtGjlqRfw8ZwlSpKxfIRqGiNwubioE2Is2OgqBApLX6ny3DCPh_lo-X3l5wyIiNDrU0RcYRNs19xH1y00SPNoBcGMjGAYPv1movkUov982KDupglf5jNFSnGJRm2H4EqXE0W0U8=w2612-h1740-no?authuser=0'
          }
          preview={{
            descComponent: <div>这是第2个详情</div>,
          }}
        />
        <Image
          wrapperStyle={{ marginRight: 24, width: 200 }}
          src={require('./images/2.jpeg')}
          isHide={true}
          preview={{
            descComponent: <div>这是第3个详情</div>,
          }}
        />
        <Image
          wrapperStyle={{ marginRight: 24, width: 200 }}
          src={require('./images/3.jpeg')}
          preview={{
            descComponent: <div>这是第4个详情</div>,
          }}
        />
        <Image
          wrapperStyle={{ marginRight: 24, width: 200 }}
          isHide={true}
          src={require('./images/3.jpeg')}
          preview={{
            descComponent: <div>这是第5个详情</div>,
          }}
        />
        <Image
          wrapperStyle={{ marginRight: 24, width: 200 }}
          src={require('./images/1.jpeg')}
          isHide={true}
          preview={{
            descComponent: <div>这是第6个详情</div>,
          }}
        />
      </Image.PreviewGroup>
    </div>
  );
}
