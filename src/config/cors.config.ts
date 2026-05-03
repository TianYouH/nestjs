// CORS 配置选项
export const corsOptions = {
  // 允许的来源（可以是具体的域名或 '*' 表示允许所有）
  // origin: '*', // 允许所有来源
  origin: ['http://localhost:3000', 'http://localhost:8080'], // 只允许特定来源

  // 允许的 HTTP 方法
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  // 允许的请求头
  allowedHeaders: 'Content-Type, Accept, Authorization',

  // 是否允许携带凭证（cookies）
  credentials: true,

  // 预检请求的缓存时间（秒）
  preflightContinue: false,

  // OPTIONS 请求的成功状态码
  optionsSuccessStatus: 204,

  // 是否暴露响应头
  exposedHeaders: ['X-Total-Count'],

  // 最大缓存时间（秒）
  maxAge: 86400,
};
