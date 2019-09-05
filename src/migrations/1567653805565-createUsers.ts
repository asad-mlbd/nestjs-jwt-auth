import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsers1567653805565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `email` varchar(320) NOT NULL, `password` varchar(100) NOT NULL, `is_active` tinyint NOT NULL, `roles` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `email` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `email` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
