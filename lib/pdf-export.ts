"use client";

// Genera un PDF cliente-side con pdf-lib, lo descarga.
// Sirve como preview. Para un PDF firmado/auditado se necesita backend.

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type PdfSection = {
  title?: string;
  body?: string;
  fields?: Array<{ label: string; value: string }>;
};

export async function generatePdf({
  title,
  subtitle,
  sections,
  filename = "documento.pdf",
}: {
  title: string;
  subtitle?: string;
  sections: PdfSection[];
  filename?: string;
}) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const usableWidth = pageWidth - 2 * margin;

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  function newPage() {
    page = pdf.addPage([pageWidth, pageHeight]);
    y = pageHeight - margin;
  }

  function ensureSpace(needed: number) {
    if (y - needed < margin) newPage();
  }

  function wrapText(text: string, font: typeof regular, size: number, maxW: number) {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";
    for (const w of words) {
      const probe = current ? `${current} ${w}` : w;
      if (font.widthOfTextAtSize(probe, size) > maxW && current) {
        lines.push(current);
        current = w;
      } else {
        current = probe;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function drawTitle(text: string, size = 16) {
    ensureSpace(size + 10);
    page.drawText(text, { x: margin, y, size, font: bold, color: rgb(0.12, 0.16, 0.23) });
    y -= size + 8;
  }

  function drawSubtitle(text: string, size = 11) {
    ensureSpace(size + 6);
    page.drawText(text, { x: margin, y, size, font: regular, color: rgb(0.4, 0.4, 0.45) });
    y -= size + 12;
  }

  function drawSectionTitle(text: string, size = 12) {
    ensureSpace(size + 8);
    page.drawText(text.toUpperCase(), {
      x: margin,
      y,
      size,
      font: bold,
      color: rgb(0.36, 0.78, 0.91),
    });
    y -= size + 6;
  }

  function drawBody(text: string, size = 10) {
    const lines = wrapText(text, regular, size, usableWidth);
    for (const line of lines) {
      ensureSpace(size + 4);
      page.drawText(line, { x: margin, y, size, font: regular, color: rgb(0.2, 0.2, 0.25) });
      y -= size + 4;
    }
    y -= 6;
  }

  function drawField(label: string, value: string, size = 10) {
    ensureSpace(size + 6);
    const labelText = `${label}:`;
    page.drawText(labelText, { x: margin, y, size, font: bold, color: rgb(0.12, 0.16, 0.23) });
    const labelWidth = bold.widthOfTextAtSize(labelText, size);
    const available = usableWidth - labelWidth - 8;
    const lines = wrapText(value || "—", regular, size, available);
    const firstLine = lines[0] ?? "";
    page.drawText(firstLine, {
      x: margin + labelWidth + 8,
      y,
      size,
      font: regular,
      color: rgb(0.25, 0.25, 0.3),
    });
    y -= size + 4;
    for (const line of lines.slice(1)) {
      ensureSpace(size + 4);
      page.drawText(line, { x: margin + labelWidth + 8, y, size, font: regular });
      y -= size + 4;
    }
    y -= 2;
  }

  // Render
  drawTitle(title);
  if (subtitle) drawSubtitle(subtitle);
  y -= 4;
  // separator
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    color: rgb(0.85, 0.87, 0.9),
    thickness: 0.5,
  });
  y -= 14;

  for (const sec of sections) {
    if (sec.title) drawSectionTitle(sec.title);
    if (sec.body) drawBody(sec.body);
    if (sec.fields) {
      for (const f of sec.fields) drawField(f.label, f.value);
    }
    y -= 8;
  }

  // Footer
  const footer = `Generado por BreveMente · ${new Date().toLocaleString("es-MX")} · Documento de demostración`;
  page.drawText(footer, {
    x: margin,
    y: 30,
    size: 8,
    font: regular,
    color: rgb(0.6, 0.6, 0.65),
  });

  const bytes = await pdf.save();
  // Copia los bytes a un Uint8Array estándar para satisfacer el tipo de BlobPart
  const buffer = new Uint8Array(bytes.length);
  buffer.set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
