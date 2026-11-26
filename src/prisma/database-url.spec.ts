import { getDatabaseUrl } from './database-url';

describe('getDatabaseUrl', () => {
  const originalUrl = process.env.DATABASE_URL;

  afterEach(() => {
    if (originalUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalUrl;
    }
  });

  it('retorna a URL quando ela já está limpa', () => {
    process.env.DATABASE_URL = 'postgresql://user:pass@host:5432/db';

    expect(getDatabaseUrl()).toBe('postgresql://user:pass@host:5432/db');
  });

  it('remove aspas duplas vindas do --env-file do Docker', () => {
    process.env.DATABASE_URL = '"postgresql://user:pass@host:5432/db?sslmode=require"';

    expect(getDatabaseUrl()).toBe(
      'postgresql://user:pass@host:5432/db?sslmode=require',
    );
  });

  it('remove aspas simples e espaços', () => {
    process.env.DATABASE_URL = "  'postgresql://user:pass@host:5432/db'  ";

    expect(getDatabaseUrl()).toBe('postgresql://user:pass@host:5432/db');
  });

  it('falha com mensagem clara quando a variável não existe', () => {
    delete process.env.DATABASE_URL;

    expect(() => getDatabaseUrl()).toThrow('DATABASE_URL não está configurada');
  });

  it('falha com mensagem clara quando a variável está vazia', () => {
    process.env.DATABASE_URL = '   ';

    expect(() => getDatabaseUrl()).toThrow('DATABASE_URL está vazia');
  });
});
