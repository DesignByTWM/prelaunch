/**
 * StudioLogo
 *
 * The real wordmark from /public/logos, referenced as a file. It is never
 * redrawn or recreated here, so the Studio shows exactly the same asset
 * the site does.
 */
export function StudioLogo() {
  return (
    <img
      src="/logos/designbytwm_logo_black.svg"
      alt="DESIGNBYTWM"
      style={{ height: 18, width: "auto", display: "block" }}
    />
  );
}
