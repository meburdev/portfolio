import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// Importamos i18next (necesario para getFixedT)
import i18next, { TFunction } from "i18next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file, lng, preview } = req.query;

  const namespace = "common";
  const lang = (lng as string) || "en";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let t: TFunction = ((key) => key) as TFunction;

  try {
    await serverSideTranslations(lang, [namespace], null, ["en", "es"]);
    t = i18next.getFixedT(lang, namespace);
  } catch (error) {
    console.error(
      "i18n load FAILED in API Route. Check file paths and JSON structure."
    );
    console.error("Error details:", error);
  }

  if (!file || typeof file !== "string") {
    return res.status(400).json({ error: t("validations.file-name") });
  }

  const filePath = path.join(process.cwd(), "public", "documents", file);

  if (
    !fs.existsSync(filePath) ||
    !filePath.startsWith(path.join(process.cwd(), "public", "documents"))
  ) {
    return res
      .status(404)
      .json({ error: "Archivo no encontrado o acceso denegado." });
  }

  const mimeType =
    path.extname(file) === ".pdf"
      ? "application/pdf"
      : "application/octet-stream";

  const originalFileName = file.replace(path.extname(file), "");
  const extension = path.extname(file);

  const translatedFileName = t(`files.${originalFileName}`, {
    defaultValue: originalFileName,
  });

  const finalFileName = `${translatedFileName}${extension}`;

  let disposition: string;
  if (preview === "true") {
    disposition = `inline; filename="${finalFileName}"`;
  } else {
    disposition = `attachment; filename="${finalFileName}"`;
  }

  // ----------------------------------------------------------------------

  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Disposition", disposition); // Usa la variable de disposición

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
