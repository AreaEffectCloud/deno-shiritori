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
    // Post /shiritori: input the next word
    if (request.method === "POST" && pathname === "/shiritori") {
        // リクエストのペイロードを取得
        const requestJson = await request.json();
        // JSONの中からnextWordを取得
        const nextWord = requestJson["nextWord"];

        // previousWordの末尾とnextWordの先頭が同一か確認
        if (previousWord.slice(-1) === nextWord.slice(0, 1)) {
            // 同一であれば、previousWordを更新
            previousWord = nextWord;
        }

        // 同一でない単語の入力時にエラーを返す
        else {
            return new Response(
                JSON.stringify({
                    "errorMessage": "前の単語に続いていません",
                    "errorCode": "10001"
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json; charset=utf-8" }
                }
            );
        }

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