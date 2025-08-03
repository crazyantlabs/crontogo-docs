import React from 'react';
import Head from '@docusaurus/Head';

// Default implementation, that you can customize
export default function Root({children}) {
  return <>
    <Head>
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,800&display=swap" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#3e37ff" />
      <script type="text/javascript">
      {`
          window.intercomSettings = { 
            // Brand specific
            action_color: '#3e37ff',
            background_color: '#3e37ff'
          }
      `}
      </script>
    </Head>
    {children}
  </>;
}