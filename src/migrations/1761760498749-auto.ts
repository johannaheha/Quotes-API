import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1761760498749 implements MigrationInterface {
    name = 'Auto1761760498749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(50) NOT NULL, "email" varchar(255), "password" varchar(255) NOT NULL, "roles" text NOT NULL DEFAULT (''), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "quote" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quote" varchar(500) NOT NULL, "author" varchar)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quote"`);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
