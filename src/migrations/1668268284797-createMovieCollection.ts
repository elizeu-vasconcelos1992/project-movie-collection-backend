import { MigrationInterface, QueryRunner } from "typeorm";

export class createMovieCollection1668268284797 implements MigrationInterface {
    name = 'createMovieCollection1668268284797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "image" character varying(120) NOT NULL, "release" date NOT NULL, "sinopse" character varying(400) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "userId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_64a78407424745d6c053e93cc36" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_756446d4a415245bf4e95f9a37c" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_756446d4a415245bf4e95f9a37c"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_64a78407424745d6c053e93cc36"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
