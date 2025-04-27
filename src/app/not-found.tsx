import Head from "next/head";
import ".//styles/404.css"; // adjust path if needed

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div>
        <header className="top-header"></header>

        {/* Dust particles */}
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>
        </div>

        {/* Lamp */}
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable"></div>
            <div className="cover"></div>
            <div className="in-cover">
              <div className="bulb"></div>
            </div>
            <div className="light"></div>
          </div>
        </div>

        {/* Error content */}
        <section className="error">
          <div className="error__content">
            <div className="error__message message">
              <h1 className="message__title">Page Not Found</h1>
              <p className="message__text">
                we are sorry, the page you were looking for is not found here. The link you followed may either be broken or no longer exists.
              </p>
            </div>
            <div className="error__nav e-nav">
              <a href="/" className="/">Go Home</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
