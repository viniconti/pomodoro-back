/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_userID_fkey";

-- DropTable
DROP TABLE "history";

-- CreateTable
CREATE TABLE "cycle_history" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3) NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "cycle_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cycle_history" ADD CONSTRAINT "cycle_history_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
