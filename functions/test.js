export function onRequest(context) {
    return new Response(
        "5秒保持テスト " + new Date().toISOString(), {
        headers: {
            'cache-control': "public, max-age=5"
        }
    })
}