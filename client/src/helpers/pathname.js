// all trailing slashes = /\/+$/
export const removeTrailingSlash = (pathname) => pathname.replace(/\/$/, "");

export const getPreviousPathname = (pathname) =>
    pathname.split("/").slice(0, -1).join("/");
