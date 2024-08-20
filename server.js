// localhostにDenoのHTTPサーバを展開

Deno.serve(async (request) => {

    // get path name
    const pathname = new URL(request.url).pathname;
    console.log(`pathname: ${pathname}`);

    // return ".public/style.css"
    if (pathname === "/style.css") {
        const cssText = await Deno.readTextFile("./public/style.css");
        return new Response(
            cssText,
            {
                headers: {
                    "Content-Type": "text/css; charset=utf-8"
                }
            }
        );
    }

    // return index.html
    const htmlText = await Deno.readTextFile("./public/index.html");
    return new Response(
        htmlText,
        {
            headers: {
                "content-Type": "text/html; charset=utf-8"
            }
        }
    );
});