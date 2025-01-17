export const SECURITY = {
  CORS: {
    DEVELOPMENT: {
      ORIGINS: ["localhost", "127.0.0.1"],
      METHODS: ["GET", "POST", "OPTIONS"],
      HEADERS: ["Content-Type", "Authorization"],
      CREDENTIALS: true,
      MAX_AGE: 86400, // 24 hours
    },
    PRODUCTION: {
      ORIGINS: [
        "ffxiv-tools.com",
        "www.ffxiv-tools.com",
        "api.ffxiv-tools.com",
      ],
      METHODS: ["GET", "POST", "OPTIONS"],
      HEADERS: ["Content-Type", "Authorization"],
      CREDENTIALS: true,
      MAX_AGE: 86400, // 24 hours
    },
  },
  HEADERS: {
    BASIC: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
    STRICT: {
      "Referrer-Policy": "no-referrer",
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
      "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none';",
      "Permissions-Policy": [
        "accelerometer=()",
        "ambient-light-sensor=()",
        "autoplay=()",
        "battery=()",
        "bluetooth=()",
        "browsing-topics=()",
        "camera=()",
        "display-capture=()",
        "document-domain=()",
        "encrypted-media=()",
        "execution-while-not-rendered=()",
        "execution-while-out-of-viewport=()",
        "gamepad=()",
        "geolocation=()",
        "gyroscope=()",
        "hid=()",
        "identity-credentials-get=()",
        "idle-detection=()",
        "local-fonts=()",
        "magnetometer=()",
        "microphone=()",
        "midi=()",
        "payment=()",
        "picture-in-picture=()",
        "publickey-credentials-get=()",
        "screen-wake-lock=()",
        "serial=()",
        "speaker-selection=()",
        "usb=()",
        "web-share=()",
        "window-management=()",
        "xr-spatial-tracking=()",

        "fullscreen=(self)",
      ].join(", "),
    },
  },
} as const;

export type SecurityConfig = typeof SECURITY;
