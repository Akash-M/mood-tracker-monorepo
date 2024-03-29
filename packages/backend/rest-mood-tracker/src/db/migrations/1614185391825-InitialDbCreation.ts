import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDbCreation1614185391825 implements MigrationInterface {
    name = 'InitialDbCreation1614185391825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_40ee3aba50fe5a16602bf4614df" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "mood_entity_status_enum" AS ENUM('relaxed', 'motivated', 'energetic', 'curious', 'confident')`);
        await queryRunner.query(`CREATE TYPE "mood_entity_intensity_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "mood_entity" ("id" SERIAL NOT NULL, "status" "mood_entity_status_enum" NOT NULL DEFAULT 'relaxed', "intensity" "mood_entity_intensity_enum" NOT NULL DEFAULT '0', "enteredAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "userUuid" uuid, CONSTRAINT "PK_a3beea07137616eaad9b0940986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mood_entity" ADD CONSTRAINT "FK_1036be34829cf52b081b0b9b751" FOREIGN KEY ("userUuid") REFERENCES "user_entity"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mood_entity" DROP CONSTRAINT "FK_1036be34829cf52b081b0b9b751"`);
        await queryRunner.query(`DROP TABLE "mood_entity"`);
        await queryRunner.query(`DROP TYPE "mood_entity_intensity_enum"`);
        await queryRunner.query(`DROP TYPE "mood_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
