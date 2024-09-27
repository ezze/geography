import React, { Component } from 'react';

export class YandexMetrika extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      // eslint-disable-next-line no-undef
      ym(55673590, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    }
  }

  render() {
    return process.env.NODE_ENV === 'production' ? (
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/55673590" style="position:absolute; left:-9999px;" alt="" />
        </div>
      </noscript>
    ) : null;
  }
}
