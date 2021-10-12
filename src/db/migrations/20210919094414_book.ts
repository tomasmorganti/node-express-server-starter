import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('book', function (table) {
        table.increments('id').primary().unique();
        table.string('name').notNullable();
        table.string('author').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('book');
}
