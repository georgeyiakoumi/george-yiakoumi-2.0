"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download } from "lucide-react";
import { toast } from "sonner";

interface CVExportControlsProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export function CVExportControls({ contentRef }: CVExportControlsProps) {
  // Print handler
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "George_Yiakoumi_CV",
  });

  // PDF handler (uses browser print to PDF)
  const handlePDF = () => {
    if (typeof window !== "undefined") {
      toast.info("Use your browser's print dialog to save as PDF");
      handlePrint();
    }
  };

  // DOCX handler
  const handleDOCX = async () => {
    try {
      if (!contentRef.current) {
        toast.error("Content not ready for export");
        return;
      }

      // Dynamic import to avoid SSR issues
      const htmlDocx = await import("html-docx-js/dist/html-docx");

      // Clone the content and clean it up for Word
      const clonedContent = contentRef.current.cloneNode(true) as HTMLElement;

      // Remove interactive elements and controls
      const controlsToRemove = clonedContent.querySelectorAll('button, [data-print-hidden]');
      controlsToRemove.forEach(el => el.remove());

      // Get the HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>George Yiakoumi - CV</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { font-size: 24pt; }
              h2 { font-size: 18pt; }
              h3 { font-size: 14pt; }
              p { font-size: 11pt; line-height: 1.5; }
            </style>
          </head>
          <body>
            ${clonedContent.innerHTML}
          </body>
        </html>
      `;

      // Convert to DOCX
      const converted = htmlDocx.asBlob(htmlContent);

      // Create download link
      const url = URL.createObjectURL(converted);
      const link = document.createElement("a");
      link.href = url;
      link.download = "George_Yiakoumi_CV.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("CV exported as DOCX");
    } catch (error) {
      console.error("Error exporting DOCX:", error);
      toast.error("Failed to export DOCX. Please try again.");
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50 flex gap-2 print:hidden" data-print-hidden>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePDF}
        className="bg-background/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
      >
        <Download className="size-4 mr-2" />
        PDF
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="bg-background/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
      >
        <Printer className="size-4 mr-2" />
        Print
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDOCX}
        className="bg-background/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
      >
        <FileText className="size-4 mr-2" />
        DOCX
      </Button>
    </div>
  );
}
