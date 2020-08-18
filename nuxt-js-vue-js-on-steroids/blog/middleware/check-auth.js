export default function (context) {
  console.log('[Middleware] Check Auth');
  // サーバー以外で実行するための条件
  if (process.client) {
    context.store.dispatch("initAuth");
  }
}
