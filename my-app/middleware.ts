import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "as-needed", // 'as-needed' means locale is only added to the URL if it's not the default
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en)/:path*"],
}
