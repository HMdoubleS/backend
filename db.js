const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the database')
})

const createTables = () => {
    const userTable = 
    `CREATE TABLE IF NOT EXISTS users(
        userId SERIAL PRIMARY KEY NOT NULL,
        firstName VARCHAR NOT NULL,
        lastName VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        UNIQUE (email)
    )`
    pool.query(userTable)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })
    .then(() => {
        const postTable = 
        `CREATE TABLE IF NOT EXISTS posts(
            postId SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR NOT NULL,
            author VARCHAR NOT NULL,
            postText VARCHAR NOT NULL,
            media VARCHAR,
            creationDate TIMESTAMP NOT NULL,
            userId int NOT NULL,
            CONSTRAINT fk_user
                FOREIGN KEY (userId)
                REFERENCES users(userId)
                ON DELETE CASCADE
        )`
        pool.query(postTable)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .then(() => {
        const commentTable = 
        `CREATE TABLE IF NOT EXISTS comment(
            commentId SERIAL PRIMARY KEY NOT NULL,
            author VARCHAR NOT NULL,
            commentText VARCHAR NOT NULL,
            creationDate TIMESTAMP NOT NULL,
            postId int NOT NULL,
            userId int NOT NULL,
            CONSTRAINT fk_user
                FOREIGN KEY (userId)
                REFERENCES users(userId)
                ON DELETE CASCADE,
            CONSTRAINT fk_post
                FOREIGN KEY (postId)
                REFERENCES posts(postId)
                ON DELETE CASCADE 
        )`
        pool.query(commentTable)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
            pool.end();
        })
    })
}

module.exports = createTables;

require('make-runnable');
