// pages/api/download.ts (Ejemplo Conceptual)

import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Obtener el nombre del archivo del query parameter (e.g., /api/download?file=mi-cv.pdf)
  const { file } = req.query;

  if (!file || typeof file !== "string") {
    return res.status(400).json({ error: "Falta el nombre del archivo." });
  }

  // 2. Construir la ruta al archivo
  // Asegúrate de que el archivo esté en una subcarpeta segura, como 'public/documentos'
  const filePath = path.join(process.cwd(), "public", "documents", file);

  // 3. Verificación de Seguridad y Existencia
  // Esto previene que los usuarios accedan a archivos fuera de la carpeta 'documentos'
  if (
    !fs.existsSync(filePath) ||
    !filePath.startsWith(path.join(process.cwd(), "public", "documents"))
  ) {
    return res
      .status(404)
      .json({ error: "Archivo no encontrado o acceso denegado." });
  }

  // 4. Determinar el Content-Type (MIME Type)
  const mimeType =
    path.extname(file) === ".pdf"
      ? "application/pdf"
      : "application/octet-stream";

  // 5. Establecer las cabeceras para forzar la descarga
  res.setHeader("Content-Type", mimeType);

  // 6. Leer y enviar el archivo
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
