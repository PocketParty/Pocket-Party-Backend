-- AlterTable
ALTER TABLE "Empresas" ADD COLUMN     "atuacao" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "eventos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "facebookLink" TEXT,
ADD COLUMN     "instagramLink" TEXT,
ADD COLUMN     "whatsappLink" TEXT;
