import React from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import FooterCopyright from '@theme/Footer/Copyright';

function LinkItem({item}) {
  const {to, href, label, prependBaseUrlToHref, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {label}
    </Link>
  );
}

// Default implementation, that you can customize
export default function Footer({children}) {
  const year = new Date().getFullYear();

  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return <footer className="margin-bottom--md margin-top--md">
    <div className="container container--fluid">
      <div className="text--center">
        {links.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 ?
              <span className="margin-left--md">
                <LinkItem item={item} />
              </span>
              :
              <LinkItem item={item} />
            }
          </React.Fragment>
        ))}
        {
          copyright && 
          <FooterCopyright copyright={copyright} />
        }
      </div>
    </div>
  </footer>
}
