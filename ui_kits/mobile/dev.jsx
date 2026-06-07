/* Ông Mập — credit nhà phát triển */
(function () {
  const api = window.OmAPI;

  function DevCredit({ className = 'om-dev' }) {
    const { DEV_SITE, DEV_URL, DEV_NAME, DEV_PHONE, DEV_PHONE_TEL } = api;
    return (
      <p className={className}>
        Dev by <a href={DEV_URL} target="_blank" rel="noopener noreferrer">{DEV_SITE}</a> - {DEV_NAME} | <a href={`tel:${DEV_PHONE_TEL}`}>{DEV_PHONE}</a>
      </p>
    );
  }

  window.OmMobile = Object.assign(window.OmMobile || {}, { DevCredit });
})();
