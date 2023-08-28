import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	// A list of all locales that are supported
	locales: ["es", "en", "pt", "fr"],

	// If this locale is matched, pathnames work without a prefix (e.g. `/about`)
	defaultLocale: "pt",
});

export const config = {
	// do not localize next.js paths
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};
