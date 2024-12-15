-- AlterTable
ALTER TABLE "enterprises" ADD COLUMN     "atuacao" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "descricao" TEXT;
