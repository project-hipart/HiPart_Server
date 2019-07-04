var express = require('express');
var router = express.Router();

const upload = require('../../config/multer');
const crypto = require('crypto-promise');

const authUtil = require("../../module/utils/authUtils");


const defaultRes = require('../../module/utils/utils');
const statusCode = require('../../module/utils/statusCode');
const resMessage = require('../../module/utils/responseMessage')
const db = require('../../module/pool');

router.post('/', authUtil.isLoggedin, async (req, res) => {

    const insertTodayQuery = 'INSERT INTO Today (after1,before1,trans_idx) VALUES (?,?, ?)';
    const insertTransQuery = 'INSERT INTO translator (user_idx) VALUES (?)';

    const insertTransaction = await db.Transaction(async (connection) => {
        const insertTransResult = await connection.query(insertTransQuery, [req.decoded.idx]);

        const transIdx = insertTransResult.insertId;
        console.log(transIdx);

        const insertTodayResult = await connection.query(insertTodayQuery, [req.body.before, req.body.after, transIdx]);

    });

    if (!insertTransaction) {
        res.status(200).send(defaultRes.successFalse(statusCode.DB_ERROR, "실패"));
    } else { //쿼리문이 성공했을 때
        res.status(200).send(defaultRes.successTrue(statusCode.OK, "성공"));
    }

});

module.exports = router;