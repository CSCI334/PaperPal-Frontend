import React, { useState } from "react";
import { Box } from "@mui/system";
import { Document, Page, pdfjs } from "react-pdf";

// Set workerSrc to load PDF files
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//Ensures file is always of type string
interface PDFViewerProps {
    file: string;
}
//This class deals with the actual rendering of PDFView and anything else it needs to render
const PDFView: React.FC<PDFViewerProps> = ({ file }) => {
    const [numPages, setNumPages] = useState<number | null>(null);

    //Function to set the number of pages upon a successful PDF load
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    //PDF render
    return (
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Document file={file}
                      renderMode={"none"}
                      onLoadSuccess={onDocumentLoadSuccess}
            >
                    {Array.from(
                        new Array(numPages ? numPages : 0),
                        (_el, index) => (
                    <Box sx={{
                        background: "#f2f2f2",
                        height: "800px"
                    }}>
                        <Page
                            pageNumber={index + 1}
                            key={`page_${index + 1}`}
                            scale={1.7}/>
                    </Box>
                ))}
            </Document>
        </Box>
    );
};

export default PDFView;

