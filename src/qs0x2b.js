const Koa = require('koa');
const axios = require('axios').default;

const app = new Koa();

app.use((ctx) => {
    ctx.body = ctx.query.txt;
});

app.listen(3000, test);

async function test() {
    let txt = 'me+w';
    let resp = await axios.get('http://localhost:3000/?txt=' + txt);
    let data = resp.data;
    // koa 的 ctx.query 使用 querystring.parse + 会变成空格
    console.log(data); // output: me w
    // 同样 + (0x2b) 变成空格
    /**
     * @see https://url.spec.whatwg.org/#urlencoded-parsing
     * 第3步：使用 0x20(空格)替换0x2b(+)
     *
     * 所以，+ 记得用 url encode
     */
    console.log(new URLSearchParams('a=' + txt).get('a')); // output: me w

    resp = await axios.get('http://localhost:3000/?txt=' + encodeURIComponent(txt));
    data = resp.data;
    console.log(data); // output: me+w

    process.exit(0);
}
