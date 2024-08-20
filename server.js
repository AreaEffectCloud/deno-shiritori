// deno.landに公開されているモジュールをimport
import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";

// save the previous word
let previousWord = "しりとり";

// localhostにDenoのHTTPサーバを展開
Deno.serve(async (request) => {

    // get path name
    const pathname = new URL(request.url).pathname;
    console.log(`pathname: ${pathname}`);

    // Get /shiritori return prev word
    if (request.method === "GET" && pathname === "/shiritori") {
        return new Response(previousWord);
    }

    // ./public以下のファイルを公開
    return serveDir(
        request,
        {
            /* 
            - fsRoot: 公開するファルダを指定
            - urlRoot: フォルダを展開するURLを指定。今回はlocalhost:8000/に直に展開する
            - enableCors: CORSの設定を付加するか
            */
           fsRoot: "./public/",
           urlRoot: "",
           enableCors: true,
        }
    );

});