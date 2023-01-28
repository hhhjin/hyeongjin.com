const theme = {
  footer: <p>2023 © HyeongJin Lee.</p>,
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
      {title && <title>{title}</title>}
    </>
  ),
  readMore: "Read More →",
  postFooter: null,
  darkMode: false,
};

export default theme;
