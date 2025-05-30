const express = require("express");
const request = require("request");
const app = express();

app.get("/msit", (req, res) => {
    const { serviceKey, numOfRows = 10, pageNo = 1, returnType = "xml" } = req.query;

    const api_url = "http://apis.data.go.kr/1721000/msitannouncementinfo/businessAnnouncMentList";

    const options = {
        url: api_url,
        qs: {
            serviceKey,
            numOfRows,
            pageNo,
            returnType,
        },
    };

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
            res.end(body);
        } else {
            console.error("API 호출 에러:", error || response.statusCode);
            res.status(response.statusCode || 500).send("API 요청 실패");
        }
    });
});

app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000/msit?serviceKey=Hk%2FN%2BBOSJC66biuLuC5Xa9aZV5PLx0peXy2H7GvdsTLr3EvwE%2BkQIqnggSASFMO3TARrxwPH%2Br6qdRS0ngd0WQ%3D%3D");
});
