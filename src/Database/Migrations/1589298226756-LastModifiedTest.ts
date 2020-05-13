import {MigrationInterface, QueryRunner} from "typeorm";

export class LastModifiedTest1589298226756 implements MigrationInterface {
    name = 'LastModifiedTest1589298226756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `LastModified` `ModifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `ModifiedAt` `LastModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
    }

}
