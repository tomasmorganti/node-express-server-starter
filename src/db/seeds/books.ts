import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('book').del();

    // Inserts seed entries
    await knex('book').insert([
        { id: 1, name: 'Fellowship of the Ring', author: 'JRR Tolkien' },
        { id: 2, name: 'Chamber of Secrets', author: 'JK Rowling' },
        { id: 3, name: 'Sherlock Holmes', author: 'Sir Arthur Conan Doyle' },
    ]);
}
