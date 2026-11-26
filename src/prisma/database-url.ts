/**
 * Normaliza a URL do banco antes de entregá-la ao Prisma/pg.
 *
 * O `docker run --env-file` não remove as aspas que estão no arquivo .env.
 * Nesse caso a conexão chega como `"postgresql://..."`, o driver pg interpreta
 * isso como um host inválido e o Prisma responde P1001 (DatabaseNotReachable),
 * fazendo o cadastro de usuários falhar com HTTP 500.
 */
export function getDatabaseUrl(): string {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    throw new Error(
      'DATABASE_URL não está configurada. Defina a URL do PostgreSQL no ambiente.',
    );
  }

  const url = rawUrl
    .trim()
    .replace(/^["']|["']$/g, '')
    .trim();

  if (!url) {
    throw new Error('DATABASE_URL está vazia após a normalização.');
  }

  return url;
}
